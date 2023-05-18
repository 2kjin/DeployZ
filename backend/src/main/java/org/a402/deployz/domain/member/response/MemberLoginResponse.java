package org.a402.deployz.domain.member.response;

import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberLoginResponse {
	@NotNull
	@Schema(description = "access 토큰")
	private final String accessToken;
	@NotNull
	@Schema(description = "refresh 토큰")
	private final String refreshToken;
}
