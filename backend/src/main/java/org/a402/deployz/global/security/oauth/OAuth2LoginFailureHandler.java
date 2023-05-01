package org.a402.deployz.global.security.oauth;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginFailureHandler implements AuthenticationFailureHandler {
	private final HttpCookieOAuthAuthorizationRequestRepository httpCookieOAuthAuthorizationRequestRepository;

	@Override
	public void onAuthenticationFailure(final HttpServletRequest request, final HttpServletResponse response,
		final AuthenticationException exception) throws IOException {

		log.error("### => {}", exception.getMessage(), exception);
		response.sendRedirect("/oauth/login?error=" + exception.getMessage());
		httpCookieOAuthAuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
	}
}
