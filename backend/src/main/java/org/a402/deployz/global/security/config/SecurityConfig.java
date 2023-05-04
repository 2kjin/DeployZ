package org.a402.deployz.global.security.config;

import java.util.Arrays;
import java.util.List;

import org.a402.deployz.global.security.jwt.JwtAuthenticationEntryPoint;
import org.a402.deployz.global.security.jwt.JwtAuthenticationFilter;
import org.a402.deployz.global.security.jwt.JwtTokenProvider;
import org.a402.deployz.global.security.oauth.CustomOAuth2UserService;
import org.a402.deployz.global.security.oauth.HttpCookieOAuthAuthorizationRequestRepository;
import org.a402.deployz.global.security.oauth.OAuth2LoginFailureHandler;
import org.a402.deployz.global.security.oauth.OAuth2LoginSuccessHandler;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	public static final String SERVER_URL_PATTERN = "http://k8a402.p.ssafy.io";
	public static final String FRONT_URL_PATTERN = "http://localhost:5173";
	public static final String FRONT_URL_PATTERN_SERVER = "http://localhost:3000";
	public static final String BASE_URL_PATTERN = "/**";
	public static final String HEAD = "HEAD";
	public static final String OPTIONS = "OPTIONS";
	public static final String POST = "POST";
	public static final String GET = "GET";
	public static final String DELETE = "DELETE";
	public static final String PUT = "PUT";
	public static final String ALLOW_PATTERN = "*";

	private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
	private final OAuth2LoginFailureHandler oAUth2LoginFailureHandler;
	private final HttpCookieOAuthAuthorizationRequestRepository httpCookieOAuthAuthorizationRequestRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final CustomOAuth2UserService customOAuth2UserService;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
			.httpBasic().disable() // rest api 이기 때문에 기본 설정을 사용하지 않는다. (기본설정은 비인증시 로그인 화면으로 리다이렉트)
			.csrf().disable() // rest api 이기 때문에 csrf 보안이 필요 없으므로 disable 처리한다.
			.formLogin().disable()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt Token으로 인증하므로 session 생성하지 않는다.
			.and()
			.cors().configurationSource(corsConfigurationSource());

		httpSecurity.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);

		httpSecurity.authorizeRequests()
			//HttpServletRequest를 사용하는 요청에 대한 권한체크
			.antMatchers("/", "/actuator/health").permitAll().anyRequest().authenticated();

		httpSecurity.authorizeRequests()// PERMIT_URL_ARRAY 에서 지정한 인증없이 권한 허가.
			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
		// 커스텀 필터를 ID/PW 기반으로 인증하는 기본 필터 앞에 넣어서 먼저 인증을 시도하게 한다.

		httpSecurity.oauth2Login() //OAuth 2.0 기반 인증을 처리하기위해 Provider와의 연동을 지원
			.authorizationEndpoint()
			.authorizationRequestRepository(httpCookieOAuthAuthorizationRequestRepository)
			.and()
			.userInfoEndpoint() // //OAuth 2.0 Provider로부터 사용자 정보를 가져오는 엔드포인트를 지정하는 메서드
			.userService(customOAuth2UserService)
			.and()
			.successHandler(oAuth2LoginSuccessHandler)
			.failureHandler(oAUth2LoginFailureHandler); //OAuth 2.0 인증이 처리되는데 사용될 사용자 서비스를 지정하는 메서드

		return httpSecurity.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(
		final AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		final CorsConfiguration corsConfiguration = new CorsConfiguration();

		//		corsConfiguration.setAllowedOrigins(List.of(FRONT_URL_PATTERN, SERVER_URL_PATTERN, FRONT_URL_PATTERN_SERVER));
		corsConfiguration.setAllowedOriginPatterns(List.of("*"));
		corsConfiguration.setAllowedMethods(Arrays.asList(POST, GET, DELETE, PUT, HEAD, OPTIONS));
		corsConfiguration.setAllowedHeaders(List.of(ALLOW_PATTERN));
		corsConfiguration.setAllowCredentials(true);

		final UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration(BASE_URL_PATTERN, corsConfiguration);

		return urlBasedCorsConfigurationSource;
	}

}
