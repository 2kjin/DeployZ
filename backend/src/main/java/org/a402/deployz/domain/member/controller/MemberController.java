package org.a402.deployz.domain.member.controller;

import org.a402.deployz.domain.member.request.MemberUpdateRequest;
import org.a402.deployz.domain.member.request.ReCreateTokenRequest;
import org.a402.deployz.domain.member.response.MemberInformationResponse;
import org.a402.deployz.domain.member.response.MemberUpdateResponse;
import org.a402.deployz.domain.member.service.MemberService;
import org.a402.deployz.global.common.BaseResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Tag(name = "Member", description = "회원 관련 API")
public class MemberController {
	private final MemberService memberService;

	@Operation(description = "유저 정보 조회하기 API", summary = "유저 정보 조회하기 API")
	@ApiResponse(responseCode = "200", description = "유저정보 불러오기 성공")
	@ApiResponse(responseCode = "400", description = "유저정보 찾을 수 없음")
	@GetMapping
	public BaseResponse<MemberInformationResponse> findMemberInfo(@AuthenticationPrincipal final UserDetails userDetails) {
		final MemberInformationResponse memberInformation = memberService.findMemberInformation(userDetails);

		return new BaseResponse<>(memberInformation);
	}

	@Operation(description = "회원 정보 수정하기 API", summary = "회원 정보 수정하기 API")
	@ApiResponse(responseCode = "200", description = "회원 정보 수정 성공")
	@ApiResponse(responseCode = "400", description = "회원 정보 찾을 수 없음")
	@PutMapping
	public BaseResponse<MemberUpdateResponse> updateMember(@RequestBody MemberUpdateRequest memberUpdateRequest) {
		final MemberUpdateResponse memberUpdateResponse = memberService.updateMember(memberUpdateRequest);

		return new BaseResponse<>(memberUpdateResponse);
	}

	@Operation(description = "토큰 재생성 API", summary = "토큰 재생성 API")
	@ApiResponse(responseCode = "200", description = "신규 엑세스 토큰 발급 완료")
	@ApiResponse(responseCode = "400", description = "유저정보 찾을 수 없음")
	@PostMapping("/reCreate")
	public BaseResponse<String> reCreateTokens(@RequestBody ReCreateTokenRequest reCreateTokenRequest,
		@AuthenticationPrincipal final UserDetails userDetails) {
		final String newToken = memberService.reCreateToken(reCreateTokenRequest, userDetails);

		return new BaseResponse<>(newToken);
	}
}
