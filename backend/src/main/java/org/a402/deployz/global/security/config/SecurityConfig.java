package org.a402.deployz.global.security.config;

import java.util.Arrays;
import java.util.List;

import org.a402.deployz.global.security.jwt.JwtAuthenticationEntryPoint;
import org.a402.deployz.global.security.jwt.JwtAuthenticationFilter;
import org.a402.deployz.global.security.jwt.JwtTokenProvider;
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
	public static final String BASE_URL_PATTERN = "/**";
	public static final String HEAD = "HEAD";
	public static final String OPTIONS = "OPTIONS";
	public static final String POST = "POST";
	public static final String GET = "GET";
	public static final String DELETE = "DELETE";
	public static final String PUT = "PUT";
	public static final String ALLOW_PATTERN = "*";
	private static final String[] PERMIT_URL_ARRAY = {
		/*회원가입*/
		"/api/member/validateServerKey",
		"/api/member/signup",
		"/api/member/login",
		"/",
		"/actuator/**",
	};

	private final JwtTokenProvider jwtTokenProvider;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
			.httpBasic().disable() // rest api 이기 때문에 기본 설정을 사용하지 않는다. (기본설정은 비인증시 로그인 화면으로 리다이렉트)
			.csrf().disable() // rest api 이기 때문에 csrf 보안이 필요 없으므로 disable 처리한다.
			.cors().configurationSource(corsConfigurationSource())
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS); // jwt Token으로 인증하므로 session 생성하지 않는다.

		httpSecurity
			.authorizeRequests()
			.antMatchers("/api/project/**", "/api/item/**", "/api/git/**")
			.authenticated()
			.antMatchers(PERMIT_URL_ARRAY)
			.permitAll()
			.anyRequest()
			.permitAll();

		//HttpServletRequests를 사용하는 요청에 대한 권한체크
		httpSecurity
			.authorizeRequests()
			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
		// 커스텀 필터를 ID/PW 기반으로 인증하는 기본 필터 앞에 넣어서 먼저 인증을 시도하게 한다.

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

		corsConfiguration.setAllowedOriginPatterns(List.of("*"));
		corsConfiguration.setAllowedMethods(Arrays.asList(POST, GET, DELETE, PUT, HEAD, OPTIONS));
		corsConfiguration.setAllowedHeaders(List.of(ALLOW_PATTERN));
		corsConfiguration.setAllowCredentials(true);

		final UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration(BASE_URL_PATTERN, corsConfiguration);

		return urlBasedCorsConfigurationSource;
	}

}
