package org.a402.deployz.domain.member.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class InvalidTokenException extends GlobalBaseException {
	public InvalidTokenException() {
		super(GlobalErrorCode.INVALID_TOKEN);
	}
}
