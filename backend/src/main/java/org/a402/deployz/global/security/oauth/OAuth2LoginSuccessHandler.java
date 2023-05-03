package org.a402.deployz.global.security.oauth;

import static org.a402.deployz.global.security.oauth.HttpCookieOAuthAuthorizationRequestRepository.REDIRECT_URI;
import static org.springframework.http.HttpHeaders.*;
import static org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames.*;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.exception.MemberNotFoundException;
import org.a402.deployz.domain.member.repository.MemberRepository;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.a402.deployz.global.security.jwt.JwtTokenProvider;
import org.a402.deployz.global.security.oauth.exception.UnsupportedInfoException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	public static final String REGISTRATION_ID = "registrationId";
	public static final String LOGIN_SERVER_REDIRECT_URL = "/loginRedirect";
	public static final String SIGNUP_SERVER_REDIRECT_URL = "/signupRedirect";
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberRepository memberRepository;
	private final HttpCookieOAuthAuthorizationRequestRepository httpCookieOAuthAuthorizationRequestRepository;

	@Override
	public void onAuthenticationSuccess(final HttpServletRequest request, final HttpServletResponse response,
		final Authentication authentication) throws IOException {
		final String targetUrl = determineTargetUrl(request, response, authentication);

		clearAuthenticationAttributes(request, response);
		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}

	protected String determineTargetUrl(final HttpServletRequest httpServletRequest,
		final HttpServletResponse httpServletResponse, final Authentication authentication) {
		log.info("로그인 성공 후처리 시작");
		final Optional<String> redirectUri = CookieUtils.getCookie(httpServletRequest, REDIRECT_URI)
			.map(Cookie::getValue);

		final OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
		final Map<String, Object> attributes = oAuth2User.getAttributes();
		log.info("로그인 유저정보 = {}", oAuth2User);

		final OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken)authentication;
		final String registrationId = oAuth2AuthenticationToken.getAuthorizedClientRegistrationId(); // provider 정보추출
		final OAuth2MemberInfo oAuth2UserInfo = createOAuth2UserInfo(registrationId,
			attributes); // provider에 해당하는 유저객체 생성
		final Member member = memberRepository.findMemberByEmail(oAuth2UserInfo.getEmail())
			.orElseThrow(MemberNotFoundException::new); // 데이터 조회
		final String accessToken = jwtTokenProvider.createAccessToken(member);
		final String refreshToken = jwtTokenProvider.createRefreshToken(accessToken, member.getEmail());

		httpServletResponse.setHeader(AUTHORIZATION, accessToken);

		if (member.getPersonalAccessToken() == null) {
			return UriComponentsBuilder.newInstance()
				.scheme("http")
				.host("localhost:5173")
				.path(SIGNUP_SERVER_REDIRECT_URL)
				.queryParam(ACCESS_TOKEN, accessToken)
				.queryParam(REFRESH_TOKEN, refreshToken)
				.queryParam(REGISTRATION_ID, registrationId)
				.build()
				.toUriString();
		}

		return UriComponentsBuilder.newInstance()
//			.path(LOGIN_SERVER_REDIRECT_URL)
			.scheme("http")
			.host("localhost:5173")
			.path(LOGIN_SERVER_REDIRECT_URL)
			.queryParam(ACCESS_TOKEN, accessToken)
			.queryParam(REFRESH_TOKEN, refreshToken)
			.queryParam(REGISTRATION_ID, registrationId)
			.build()
			.toUriString();
	}

	private OAuth2MemberInfo createOAuth2UserInfo(final String registrationId, final Map<String, Object> attributes) {
		if (registrationId.equals(SocialType.GITLAB.getSocialType())) {
			return new GitlabMemberInfo(attributes);
		}

		throw new UnsupportedInfoException(GlobalErrorCode.UNSUPPORTED_INFO);
	}

	protected void clearAuthenticationAttributes(final HttpServletRequest httpServletRequest,
		final HttpServletResponse httpServletResponse) {
		super.clearAuthenticationAttributes(httpServletRequest);
		httpCookieOAuthAuthorizationRequestRepository.removeAuthorizationRequestCookies(httpServletRequest,
			httpServletResponse);
	}
}
