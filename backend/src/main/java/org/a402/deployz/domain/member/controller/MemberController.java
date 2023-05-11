package org.a402.deployz.domain.member.controller;

import javax.validation.Valid;

import org.a402.deployz.domain.member.request.MemberLoginRequest;
import org.a402.deployz.domain.member.request.ReCreateTokenRequest;
import org.a402.deployz.domain.member.request.RegisterTokenRequest;
import org.a402.deployz.domain.member.request.SignUpRequest;
import org.a402.deployz.domain.member.request.ValidateServerKeyRequest;
import org.a402.deployz.domain.member.response.MemberInformationResponse;
import org.a402.deployz.domain.member.response.MemberLoginResponse;
import org.a402.deployz.domain.member.service.MemberService;
import org.a402.deployz.global.common.BaseResponse;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Tag(name = "Member", description = "회원 관련 API")
public class MemberController {
	private final MemberService memberService;

	@Operation(description = "서버키 유효성 검사 API", summary = "서버키 유효성 검사 API")
	@ApiResponse(responseCode = "200", description = "서버키 유효성 검사 성공", content = @Content(schema = @Schema(implementation = Boolean.class)))
	@PostMapping("/validateServerKey")
	public BaseResponse<Boolean> validateServerKey(
		@Valid @RequestBody ValidateServerKeyRequest validateServerKeyRequest) {
		log.info("serverKey 유효성 검사 시작");
		final Boolean isValid = memberService.validateServerKey(validateServerKeyRequest);

		return new BaseResponse<>(isValid);
	}

	@Operation(description = "회원가입 API", summary = "회원가입 API")
	@ApiResponse(responseCode = "200", description = "회원가입 성공", content = @Content(schema = @Schema(implementation = Boolean.class)))
	@PostMapping("/signup")
	public BaseResponse<Boolean> signup(@Valid @RequestBody SignUpRequest signUpRequest) {
		final Boolean isSignup = memberService.signup(signUpRequest);

		return new BaseResponse<>(isSignup);
	}

	@Operation(description = "로그인 API", summary = "로그인 API")
	@ApiResponse(responseCode = "200", description = "로그인 성공", content = @Content(schema = @Schema(implementation = Boolean.class)))
	@ApiResponse(responseCode = "400", description = "로그인 정보가 일치하지 않습니다.", content = @Content(schema = @Schema(implementation = Boolean.class)))
	@PostMapping("/login")
	public BaseResponse<MemberLoginResponse> login(@Valid @RequestBody MemberLoginRequest memberLoginRequest) {
		final MemberLoginResponse memberLoginResponse = memberService.login(memberLoginRequest);

		return new BaseResponse<>(memberLoginResponse);
	}

	@Operation(description = "유저 정보 조회하기 API", summary = "유저 정보 조회하기 API")
	@ApiResponse(responseCode = "200", description = "유저정보 불러오기 성공")
	@ApiResponse(responseCode = "400", description = "유저정보 찾을 수 없음")
	@GetMapping
	public BaseResponse<MemberInformationResponse> findMemberInfo(
		@AuthenticationPrincipal final UserDetails userDetails) {
		final MemberInformationResponse memberInformation = memberService.findMemberInformation(userDetails);

		return new BaseResponse<>(memberInformation);
	}

	@Operation(description = "회원 개인 토큰 등록 API", summary = "회원 개인 토큰 등록하기 API")
	@ApiResponse(responseCode = "200", description = "회원 정보 수정 성공")
	@ApiResponse(responseCode = "400", description = "회원 정보 찾을 수 없음")
	@PostMapping("/personalAccessToken")
	public BaseResponse<String> registerToken(@RequestBody RegisterTokenRequest registerTokenRequest,
		@AuthenticationPrincipal UserDetails userDetails) {
		memberService.registerToken(registerTokenRequest, userDetails);

		return new BaseResponse<>(GlobalErrorCode.SUCCESS);
	}

	@Operation(description = "회원 개인 토큰 조회 API", summary = "회원 개인 토큰 조회하기 API")
	@ApiResponse(responseCode = "200", description = "신규 엑세스 토큰 발급 완료")
	@ApiResponse(responseCode = "400", description = "유저정보 찾을 수 없음")
	@GetMapping("/personalAccessToken")
	public BaseResponse<String> findPersonalAccessToken(@AuthenticationPrincipal final UserDetails userDetails) {
		final String personalAccessToken = memberService.findPersonalAccessToken(userDetails);

		return new BaseResponse<>(personalAccessToken);
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
