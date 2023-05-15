package org.a402.deployz.global.error;

import lombok.Getter;

/**
 * 프로젝트 내 사용되는 에러 코드
 */
@Getter
public enum GlobalErrorCode {
	/**
	 * 에러코드 규칙 :
	 * 1. 코드 맨 앞에는 연관된 Entity의 첫글자의 대문자를 적는다 ex)  Member -> M
	 * 2. 에러 코드와 이름 , 메시지가 최대한 모호하지 않게 작성합니다.
	 * 3. 공통으로 발생하는 에러에 대해서는 Global -> G를 붙여서 작성 합니다.
	 */
	SUCCESS(200, "G000", "요청에 성공하였습니다."),
	OTHER(500, "G100", "서버에 오류가 발생했습니다"),
	METHOD_NOT_ALLOWED(405, "G200", "허용되지 않은 메서드입니다"),
	VALID_EXCEPTION(400, "G300", ""),
	ACCESS_DENIED(401, "G400", "허용되지 않은 사용자입니다"),
	TOKEN_EXPIRED(401, "G500", "토큰이 만료되었습니다."),
	LOGIN_INFO_MISMATCH(401, "G600", "로그인 정보가 일치하지 않습니다."),
	FILE_NOT_FOUND(400, "G400", "파일이 존재하지 않습니다."),
	INVALID_DATA_TYPE(400, "S100", "지원하는 이미지의 데이터 타입이 아닙니다."),
	/* 회원 관련 에러 코드 */
	INVALID_TOKEN(400, "M400", "유효하지 않은 토큰입니다."),
	MISMATCH_PASSWORD(400, "M400", "로그인 정보가 일치하지 않습니다."),
	MEMBER_NOT_FOUND(400, "M100", "존재하지 않는 사용자입니다."),
	PERSONAL_TOKEN_NOT_FOUND(400, "M100", "사용자의 토큰이 존재하지 않습니다."),
	UNSUPPORTED_INFO(400, "O100", "지원하지 않는 로그인 방식입니다."),
	/*프로젝트 관련 에러 코드*/
	PROJECT_NOT_FOUND(400, "P100", "해당 프로젝트가 존재하지 않습니다."),
	DEPLOY_NOT_FOUND(400, "P100", "해당하는 Item의 배포정보가 존재하지 않습니다.."),
	NGINX_CONFIG_NOT_FOUND(400, "P100", "해당 NGINX 설정 정보가 존재하지 않습니다."),
	DUPLICATE_PROJECT_ID(400, "P100", "이미 존재하는 프로젝트 ID 입니다."),

	/*포트번호 관련 에러 코드*/
	DUPLICATE_PORT_NUMBER (400, "P100", "해당 포트 번호는 존재합니다."),
	INCONSISTENT_PORT_NUMBER(400, "P100", "해당 포트 번호는 올바른 형식이 아닙니다."),
	OUT_OF_RANGE_PORT_NUM(400, "P100", "해당 포트 번호의 범위를 확인해주세요."),


	/* 컨테이너 관련 에러 코드*/
	ITEM_NOT_FOUND(400, "I100", "해당 컨테이너가 존재하지 않습니다."),
	URL_INVALID_FORMAT(400, "G400", "잘못된 URL 형식입니다."),
	NOT_SUPPORTED_EVENT_TYPE(400, "G400", "지원하지 않는 이벤트종류 입니다."),
	GIT_TOKEN_NOT_FOUND(400, "G400", "존재하지 않는 토큰입니다."),
	GIT_CONFIG_NOT_FOUND(400, "G400", "해당하는 프로젝트에 대한 Git 설정정보가 존재하지 않습니다."),
	;

	private final String code;
	private final String message;
	private final int status;

	GlobalErrorCode(final int status, final String code, final String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}

}

