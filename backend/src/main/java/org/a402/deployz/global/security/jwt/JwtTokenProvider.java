package org.a402.deployz.global.security.jwt;

import static org.springframework.http.HttpHeaders.*;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.exception.InvalidTokenException;
import org.a402.deployz.domain.member.exception.TokenExpiredException;
import org.a402.deployz.domain.member.service.MemberDetailService;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.a402.deployz.global.security.redis.RedisRefreshTokenRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
	public static final String SPLIT_REGEX = " ";
	private String key = "deployz";
	public static final String BEARER = "Bearer ";
	public static final String BRANCH_NAME = "branchName";

	private final MemberDetailService memberDetailService;
	private final RedisRefreshTokenRepository redisRefreshTokenRepository;

	@PostConstruct
	private void init() {
		key = Base64.getEncoder().encodeToString(key.getBytes());
	}

	// Jwt 토큰 생성
	public String createAccessToken(final Member member) {
		// Claim이란 JWT의 Payload에 들어가는 데이터 단위.
		// Map<String, Object>를 상속하고 있기 때문에 key, value 형식으로 값을 넣을 수 있다.
		final Claims claims = Jwts.claims().setSubject(member.getAccount());
		claims.put(AUTHORIZATION, member.getAuthorities()); // 권한

		final long accessTokenValidSecond = Duration.ofDays(1).toMillis(); //access토큰 유효시간
		final Date now = new Date();

		return Jwts.builder()
			.setClaims(claims) // 데이터
			.setIssuedAt(now)  // 토큰 발행 일자
			.setExpiration(new Date(now.getTime() + accessTokenValidSecond)) // 토큰 만료시간 설정.
			.signWith(SignatureAlgorithm.HS256, key) // 사용할 암호화 알고리즘, secret key값 설정
			.compact();
	}

	// Jwt secret token 생성
	public String createSecretToken(final Member member, final String branchName) {
		// Claim이란 JWT의 Payload에 들어가는 데이터 단위.
		// Map<String, Object>를 상속하고 있기 때문에 key, value 형식으로 값을 넣을 수 있다.
		final Claims claims = Jwts.claims().setSubject(member.getAccount());
		claims.put(AUTHORIZATION, member.getAuthorities()); // 권한
		claims.put(BRANCH_NAME, branchName); // 권한

		final Date now = new Date();

		return Jwts.builder()
			.setClaims(claims) // 데이터
			.setIssuedAt(now)  // 토큰 발행 일자
			.signWith(SignatureAlgorithm.HS256, key) // 사용할 암호화 알고리즘, secret key값 설정
			.compact();
	}

	public String getBranchName(final String secretToken) {
		final String originalToken = splitBearer(secretToken);
		final Jws<Claims> claimsJws = Jwts.parser().setSigningKey(key).parseClaimsJws(originalToken);

		return String.valueOf(claimsJws.getBody().get(BRANCH_NAME));
	}

	// refreshToken 생성.
	public String createRefreshToken(final String accessToken, final String account) {
		final long refreshTokenValidSecond = Duration.ofDays(14).toMillis(); //refresh토큰 유효시간
		final Date now = new Date();

		final String refreshToken = Jwts.builder()
			.setSubject(account)
			.setIssuedAt(now)  // 토큰 발행 일자
			.setExpiration(new Date(now.getTime() + refreshTokenValidSecond)) // 토큰 만료시간 설정.
			.signWith(SignatureAlgorithm.HS256, key) // 사용할 암호화 알고리즘, secret key값 설정
			.compact();

		redisRefreshTokenRepository.save(accessToken, refreshToken);

		return refreshToken;
	}

	// Jwt 토큰으로 인증 정보 조회
	public Authentication getAuthentication(final String accessToken) {
		final String userAccount = getUserAccount(accessToken);
		String saveToken = accessToken;
		UserDetails userDetails;

		if (userAccount == null) {
			final RefreshToken refreshToken = redisRefreshTokenRepository.findById(accessToken)
				.orElseThrow(() -> new JwtException(GlobalErrorCode.TOKEN_EXPIRED.getMessage()));

			saveToken = refreshToken.getAccessToken();
		}

		final String userAccount1 = getUserAccount(saveToken);
		userDetails = memberDetailService.loadUserByUsername(userAccount1);

		return new UsernamePasswordAuthenticationToken(userDetails, accessToken, userDetails.getAuthorities());
	}

	// Jwt 토큰에서 회원 구별 정보 추출(account).
	public String getUserAccount(final String token) {
		return Jwts.parser()
			.setSigningKey(key)
			.parseClaimsJws(token)
			.getBody()
			.getSubject();
	}

	// Jwt 토큰의 유효성 + 만료일자 확인
	public boolean validAccessToken(final String token) throws ExpiredJwtException {
		Jws<Claims> claims;

		try {
			// 토큰에서 Claims 추출.
			claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token);

			return !claims.getBody().getExpiration().before(new Date());
		} catch (ExpiredJwtException expiredJwtException) {
			throw new TokenExpiredException();
		} catch (MalformedJwtException | SignatureException exception) {
			throw new InvalidTokenException();
		}
	}

	public String splitToken(final String bearerToken) {
		String originToken = bearerToken;

		// prefix부분을 날리고 JWT만 token에 할당한다.
		if (bearerToken != null && bearerToken.startsWith(BEARER)) {
			originToken = splitBearer(bearerToken);
		} // token 확인.

		return originToken;
	}

	public String reCreateAccessToken(final String refreshToken, final Member member) {
		final String newAccessToken = createAccessToken(member);
		redisRefreshTokenRepository.save(newAccessToken, refreshToken);

		return newAccessToken;
	}

	public String splitBearer(final String bearerToken) {
		return bearerToken.split(SPLIT_REGEX)[1];
	}
}
