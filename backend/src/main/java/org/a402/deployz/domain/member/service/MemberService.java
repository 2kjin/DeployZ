package org.a402.deployz.domain.member.service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.exception.MemberNotFoundException;
import org.a402.deployz.domain.member.exception.PasswordMismatchException;
import org.a402.deployz.domain.member.exception.PersonalTokenNotFountException;
import org.a402.deployz.domain.member.repository.MemberRepository;
import org.a402.deployz.domain.member.request.MemberLoginRequest;
import org.a402.deployz.domain.member.request.ReCreateTokenRequest;
import org.a402.deployz.domain.member.request.RegisterTokenRequest;
import org.a402.deployz.domain.member.request.SignUpRequest;
import org.a402.deployz.domain.member.request.ValidateServerKeyRequest;
import org.a402.deployz.domain.member.response.MemberInformationResponse;
import org.a402.deployz.domain.member.response.MemberLoginResponse;
import org.a402.deployz.global.security.jwt.JwtTokenProvider;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final PasswordEncoder passwordEncoder;

	@Transactional(readOnly = true)
	public MemberInformationResponse findMemberInformation(final UserDetails userDetails) {
		final Member member = memberRepository.findMemberByAccount(userDetails.getUsername())
			.orElseThrow(MemberNotFoundException::new);

		return new MemberInformationResponse(member.getAccount(), member.getProfileImage());
	}

	@Transactional(readOnly = true)
	public String reCreateToken(final ReCreateTokenRequest reCreateTokenRequest, final UserDetails userDetails) {
		final Member member = memberRepository.findMemberByAccount(userDetails.getUsername())
			.orElseThrow(MemberNotFoundException::new);

		return jwtTokenProvider.reCreateAccessToken(reCreateTokenRequest.getRefreshToken(), member);
	}

	@Transactional
	public void registerToken(final RegisterTokenRequest registerTokenRequest, final UserDetails userDetails) {
		final Member member = memberRepository.findMemberByAccount(userDetails.getUsername())
			.orElseThrow(MemberNotFoundException::new);
		member.updatePersonalAccessToken(registerTokenRequest.getPersonalAccessToken());

		if (member.getPersonalAccessToken() == null) {
			throw new PersonalTokenNotFountException();
		}
	}

	public String findPersonalAccessToken(final UserDetails userDetails) {
		final Member member = memberRepository.findMemberByAccount(userDetails.getUsername())
			.orElseThrow(MemberNotFoundException::new);

		if (member.getPersonalAccessToken() == null) {
			throw new PersonalTokenNotFountException();
		}

		return member.getPersonalAccessToken();
	}

	@Transactional(readOnly = true)
	public Boolean validateServerKey(final ValidateServerKeyRequest validateServerKeyRequest) {
		// 서버 파일에서 읽어오는 로직으로 추가.
		final StringBuilder stringBuilder = getServerKey();

		return validateServerKeyRequest.getServerKey().equals(stringBuilder.toString());
	}

	private static StringBuilder getServerKey() {
		String readLine;

		final StringBuilder stringBuilder = new StringBuilder();
		final String filepath = "\\home\\conf\\AuthKey";

		try (BufferedReader bufferedReader = new BufferedReader(new FileReader(filepath))) {
			while ((readLine = bufferedReader.readLine()) != null) {
				stringBuilder.append(readLine);
			}
		} catch (FileNotFoundException fileNotFoundException) {
			log.info("file does not exist: {}", filepath);
		} catch (IOException ioException) {
			log.info("file io exception: {}", ioException.getMessage());
		}

		return stringBuilder;
	}

	@Transactional
	public Boolean signup(final SignUpRequest signUpRequest) {
		final List<Member> allMembers = memberRepository.findAll();

		if (allMembers.size() > 0) {
			return false;
		}

		if (checkAccount(signUpRequest) && checkServerKey(signUpRequest)) {
			final Member save = memberRepository.save(signUpRequest.toEntity());
			save.encodePassword(passwordEncoder);

			return true;
		}

		return false;
	}

	private static boolean checkServerKey(final SignUpRequest signUpRequest) {
		return signUpRequest.getServerKey().equals(getServerKey().toString());
	}

	private boolean checkAccount(final SignUpRequest signUpRequest) {
		return memberRepository.findMemberByAccount(signUpRequest.getAccount()).isEmpty();
	}

	@Transactional(readOnly = true)
	public MemberLoginResponse login(final MemberLoginRequest memberLoginRequest) {
		final Member member = memberRepository.findMemberByAccount(memberLoginRequest.getAccount())
			.orElseThrow(MemberNotFoundException::new);

		String accessToken;
		String refreshToken;

		if (passwordEncoder.matches(memberLoginRequest.getPassword(), member.getPassword())) {
			accessToken = jwtTokenProvider.createAccessToken(member);
			refreshToken = jwtTokenProvider.createRefreshToken(accessToken, member.getAccount());
		} else {
			throw new PasswordMismatchException();
		}

		return new MemberLoginResponse(accessToken, refreshToken);
	}
}
