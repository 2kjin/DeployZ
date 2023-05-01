package org.a402.deployz.domain.member.response;

import javax.validation.constraints.NotNull;

import org.a402.deployz.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberUpdateResponse {
	@NotNull
	@Schema(description = "회원 고유번호")
	private final Long idx;
	@NotNull
	@Schema(description = "이메일")
	private final String email;
	@NotNull
	@Schema(description = "가입경로")
	private final String registrationId;
	@NotNull
	@Schema(description = "프로필 이미지")
	private final String profileImage;
	@NotNull
	@Schema(description = "유저 개인 access token")
	private final String personalAccessToken;

	public MemberUpdateResponse(final Member member) {
		this.idx = member.getIdx();
		this.email = member.getEmail();
		this.registrationId = member.getRegistrationId();
		this.profileImage = member.getProfileImage();
		this.personalAccessToken = member.getPersonalAccessToken();
	}
}
