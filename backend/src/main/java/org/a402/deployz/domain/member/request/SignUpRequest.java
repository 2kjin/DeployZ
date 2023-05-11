package org.a402.deployz.domain.member.request;

import javax.validation.constraints.NotNull;

import org.a402.deployz.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpRequest {
	@NotNull
	@Schema(description = "계정")
	private final String account;
	@NotNull
	@Schema(description = "비밀번호")
	private final String password;
	@NotNull
	@Schema(description = "서버키")
	private final String serverKey;

	public Member toEntity() {
		return Member.builder()
			.account(account)
			.password(password)
			.build();
	}
}
