package org.a402.deployz.global.security.jwt;

import javax.persistence.Id;

import org.springframework.data.redis.core.RedisHash;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RedisHash(value = "refreshToken")
@RequiredArgsConstructor
public class RefreshToken {
	@Id
	private final String accessToken;
	private final String refreshToken;
}

