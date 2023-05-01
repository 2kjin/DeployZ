package org.a402.deployz.domain.member.response;

import javax.validation.constraints.NotNull;

import org.a402.deployz.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class MemberInformationResponse {
	@NotNull
	@Schema(description = "이메일")
	private final String email;
	@NotNull
	@Schema(description = "가입경로")
	private final String registrationId;
	@NotNull
	@Schema(description = "프로필 이미지")
	private final String profileImage;

	public MemberInformationResponse(final Member member) {
		this.email = member.getEmail();
		this.registrationId = member.getRegistrationId();
		this.profileImage = member.getProfileImage();
	}

}
