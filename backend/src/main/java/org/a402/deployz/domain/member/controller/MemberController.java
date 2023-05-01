package org.a402.deployz.domain.member.controller;

import org.a402.deployz.domain.member.request.ReCreateTokenRequest;
import org.a402.deployz.domain.member.response.MemberInformationResponse;
import org.a402.deployz.domain.member.service.MemberService;
import org.a402.deployz.global.common.BaseResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
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

	@Operation(description = "토큰 재생성 API", summary = "토큰 재생성 API")
	@ApiResponse(responseCode = "200", description = "신규 엑세스 토큰 발급 완료", content = @Content(schema = @Schema(implementation = String.class)))
	@ApiResponse(responseCode = "400", description = "해당하는 이메일 찾을 수 없음")
	@PostMapping("/reCreate")
	public BaseResponse<String> reCreateTokens(@RequestBody ReCreateTokenRequest reCreateTokenRequest) {
		final String newToken = memberService.reCreateToken(reCreateTokenRequest);

		return new BaseResponse<>(newToken);
	}

}
