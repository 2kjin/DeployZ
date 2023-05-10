package org.a402.deployz.domain.member.request;

import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReCreateTokenRequest {
	@NotNull
	@Schema(description = "refresh 토큰")
	private final String refreshToken;
}
