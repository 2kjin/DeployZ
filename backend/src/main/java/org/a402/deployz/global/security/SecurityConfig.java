package org.a402.deployz.global.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic().disable() // rest api 이기 때문에 기본 설정을 사용하지 않는다. (기본설정은 비인증시 로그인 화면으로 리다이렉트)
                .csrf().disable() // rest api 이기 때문에 csrf 보안이 필요 없으므로 disable 처리한다.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // jwt Token으로 인증하므로 session 생성하지 않는다.

        httpSecurity.authorizeRequests() //HttpServletRequest를 사용하는 요청에 대한 권한체크
                .antMatchers("*").permitAll();

        return httpSecurity.build();
    }

}


