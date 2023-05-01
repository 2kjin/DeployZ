package org.a402.deployz.global.security.oauth;

import java.util.Map;

public class GitlabMemberInfo extends OAuth2MemberInfo {
	public static final String REGISTRATION_ID = "registrationId";
	public static final String PUBLIC_EMAIL = "public_email";

	public GitlabMemberInfo(final Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getRegistrationId() {
		return String.valueOf(attributes.get(REGISTRATION_ID));
	}

	@Override
	public String getEmail() {
		return String.valueOf(attributes.get(PUBLIC_EMAIL));
	}

}
