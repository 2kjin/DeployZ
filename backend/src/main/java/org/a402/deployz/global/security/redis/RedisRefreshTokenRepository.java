package org.a402.deployz.global.security.redis;

import java.time.Duration;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.a402.deployz.global.security.jwt.RefreshToken;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RedisRefreshTokenRepository {
	private final RedisTemplate<String, String> redisTemplate;

	public void save(final String accessToken, final String refreshToken) {
		final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();

		stringStringValueOperations.set(accessToken, refreshToken);
		redisTemplate.expire(accessToken, Duration.ofDays(1).toMillis(), TimeUnit.MILLISECONDS);
	}

	public Optional<RefreshToken> findById(final String accessToken) {
		final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
		final String refreshToken = stringStringValueOperations.get(accessToken);

		if (refreshToken == null) {
			return Optional.empty();
		}

		return Optional.of(new RefreshToken(accessToken, refreshToken));
	}
}
