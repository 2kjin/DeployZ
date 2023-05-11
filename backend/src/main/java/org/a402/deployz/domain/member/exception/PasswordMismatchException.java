package org.a402.deployz.domain.member.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class PasswordMismatchException extends GlobalBaseException {
	public PasswordMismatchException() {
		super(GlobalErrorCode.MISMATCH_PASSWORD);
	}
}
