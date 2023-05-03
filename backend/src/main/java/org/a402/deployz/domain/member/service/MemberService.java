package org.a402.deployz.domain.member.service;

import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.exception.MemberNotFoundException;
import org.a402.deployz.domain.member.exception.PersonalTokenNotFountException;
import org.a402.deployz.domain.member.repository.MemberRepository;
import org.a402.deployz.domain.member.request.ReCreateTokenRequest;
import org.a402.deployz.domain.member.request.RegisterTokenRequest;
import org.a402.deployz.domain.member.response.MemberInformationResponse;
import org.a402.deployz.global.security.jwt.JwtTokenProvider;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final JwtTokenProvider jwtTokenProvider;

	@Transactional(readOnly = true)
	public MemberInformationResponse findMemberInformation(final UserDetails userDetails) {
		final Member member = memberRepository.findMemberByEmail(userDetails.getUsername())
			.orElseThrow(MemberNotFoundException::new);

		return new MemberInformationResponse(member);
	}

	@Transactional(readOnly = true)
	public String reCreateToken(final ReCreateTokenRequest reCreateTokenRequest, final UserDetails userDetails) {
		final Member member = memberRepository.findMemberByEmail(userDetails.getUsername())
			.orElseThrow(MemberNotFoundException::new);

		return jwtTokenProvider.reCreateAccessToken(reCreateTokenRequest.getRefreshToken(), member);
	}

	@Transactional
	public void registerToken(final RegisterTokenRequest registerTokenRequest, final UserDetails userDetails) {
		final Member member = memberRepository.findMemberByEmail(userDetails.getUsername()).orElseThrow(MemberNotFoundException::new);
		member.updatePersonalAccessToken(registerTokenRequest.getPersonalAccessToken());

		if (member.getPersonalAccessToken() == null) {
			throw new PersonalTokenNotFountException();
		}
	}

	public String findPersonalAccessToken(final UserDetails userDetails) {
		final Member member = memberRepository.findMemberByEmail(userDetails.getUsername())
			.orElseThrow(MemberNotFoundException::new);

		if (member.getPersonalAccessToken() == null) {
			throw new PersonalTokenNotFountException();
		}

		return member.getPersonalAccessToken();
	}
}
