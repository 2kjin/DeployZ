package org.a402.deployz.domain.member.controller;

import org.a402.deployz.domain.member.response.MemberInformationResponse;
import org.a402.deployz.domain.member.service.MemberService;
import org.a402.deployz.global.common.BaseResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Tag(name = "Project", description = "프로젝트 관련 API")
public class MemberController {
	private final MemberService memberService;

	@Operation(description = "(출제자용)유저 정보 조회하기 API", summary = "(출제자용)유저 정보 조회하기 API")
	@ApiResponse(responseCode = "200", description = "유저정보 불러오기 성공")
	@ApiResponse(responseCode = "400", description = "유저정보 찾을 수 없음")
	@GetMapping("/member")
	public BaseResponse<MemberInformationResponse> findMemberInfo(@RequestParam Long idx) {
		final MemberInformationResponse memberInformation = memberService.findMemberInformation(idx);

		return new BaseResponse<>(memberInformation);
	}

}
