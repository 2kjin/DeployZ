package org.a402.deployz.global.security.oauth;

import java.util.Map;

import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.a402.deployz.global.security.oauth.exception.UnsupportedInfoException;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuthAttributes {
	private final OAuth2MemberInfo oAuth2MemberInfo;
	private final String nameAttributeKey;

	@Builder
	public OAuthAttributes(final OAuth2MemberInfo oAuth2MemberInfo, final String nameAttributeKey) {
		this.oAuth2MemberInfo = oAuth2MemberInfo;
		this.nameAttributeKey = nameAttributeKey;
	}

	/*
	 * CustomOAuth2UserService에서 파라미터들을 주입해서 OAuthAttributes 객체를 생성하는 메소드
	 * 파라미터로 들어온 SocialType 별로 분기 처리하여 각 소셜 타입에 맞게 OAuthAttributes를 생성
	 * */
	public static OAuthAttributes of(final SocialType socialType, final String userNameAttributeName,
		final Map<String, Object> attributes) {
		if (SocialType.GITLAB.equals(socialType)) {
			return ofGitlab(userNameAttributeName, attributes);
		}

		throw new UnsupportedInfoException(GlobalErrorCode.UNSUPPORTED_INFO);
	}

	/*
	 * 소셜 타입 별로 나눠서 빌더로 OAuthAttributes 빌드 시
	 * 유저 정보 추상 클래스인 OAuth2UserInfo 필드에 각 소셜 타입의 OAuth2UserInfo를 생성하여 빌드
	 * */
	private static OAuthAttributes ofGitlab(final String userNameAttributeName, final Map<String, Object> attributes) {
		return OAuthAttributes.builder()
			.nameAttributeKey(userNameAttributeName)
			.oAuth2MemberInfo(new GitlabMemberInfo(attributes))
			.build();
	}

	/*
	 * of 메소드로 OAuthAttributes 객체가 생성되어, 유저 정보들이 담긴 OAuth2UserInfo가 소셜 타입별로 주입된 상태
	 * OAuth2UserInfo에서 email, nickname, imageUrl 등을 가져와서 build
	 * email에는 UUID로 중복 없는 랜덤 값 생성
	 * role은 GUEST로 설정
	 */
	public Member toEntity(final SocialType socialType, final OAuth2MemberInfo oAuth2MemberInfo) {
		return Member.builder()
			.email(oAuth2MemberInfo.getEmail())
			.registrationId(socialType.getSocialType())
			.build();
	}
}
