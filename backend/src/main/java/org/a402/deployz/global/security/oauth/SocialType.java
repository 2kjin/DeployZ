package org.a402.deployz.global.security.oauth;

public enum SocialType {
	GITLAB("gitlab"),
	;

	private final String socialType;

	SocialType(final String socialType) {
		this.socialType = socialType;
	}

	public String getSocialType() {
		return socialType;
	}
}
