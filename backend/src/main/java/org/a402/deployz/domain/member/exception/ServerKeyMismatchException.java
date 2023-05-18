package org.a402.deployz.domain.member.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class ServerKeyMismatchException extends GlobalBaseException {
	public ServerKeyMismatchException() {
		super(GlobalErrorCode.SERVER_KEY_MISMATCH);
	}
}
