package org.a402.deployz.domain.member.request;

import javax.validation.constraints.NotNull;

import org.a402.deployz.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberUpdateRequest {
	@NotNull
	@Schema(description = "회원 고유번호")
	private final Long idx;
	@NotNull
	@Schema(description = "이메일")
	private final String email;
	@NotNull
	@Schema(description = "프로필 이미지")
	private final String profileImage;
	@NotNull
	@Schema(description = "가입경로")
	private final String registrationId;
	@NotNull
	@Schema(description = "유저 개인 access token")
	private final String personalAccessToken;

	public Member toEntity() {
		return Member.builder()
			.idx(idx)
			.email(email)
			.registrationId(registrationId)
			.profileImage(profileImage)
			.personalAccessToken(personalAccessToken)
			.build();
	}
}
