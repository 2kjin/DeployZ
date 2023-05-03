package org.a402.deployz.domain.member.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class PersonalTokenNotFountException extends GlobalBaseException {
	public PersonalTokenNotFountException() {
		super(GlobalErrorCode.PERSONAL_TOKEN_NOT_FOUND);
	}
}
