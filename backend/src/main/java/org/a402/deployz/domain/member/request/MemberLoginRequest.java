package org.a402.deployz.domain.member.request;

import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberLoginRequest {
	@NotNull
	@Schema(description = "계정")
	private final String account;
	@NotNull
	@Schema(description = "비밀번호")
	private final String password;
}

