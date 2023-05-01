package org.a402.deployz.global.security.oauth;

import java.util.Map;

public abstract class OAuth2MemberInfo{
	protected Map<String, Object> attributes;

	public OAuth2MemberInfo(final Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public abstract String getRegistrationId(); // 소셜 식별하는 값, 구글-sub, 카카오-id
	public abstract String getEmail();
}