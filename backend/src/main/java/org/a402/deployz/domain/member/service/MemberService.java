package org.a402.deployz.domain.member.service;

import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.repository.MemberRepository;
import org.a402.deployz.domain.member.response.MemberInformationResponse;
import org.a402.deployz.domain.member.exception.MemberNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;

	@Transactional(readOnly = true)
	public MemberInformationResponse findMemberInformation(final Long idx) {
		final Member member = memberRepository.findById(idx)
			.orElseThrow(MemberNotFoundException::new);

		return new MemberInformationResponse(member);
	}

}
