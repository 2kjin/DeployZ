package org.a402.deployz.global.security.oauth.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class UnsupportedInfoException extends GlobalBaseException {
	public UnsupportedInfoException(final GlobalErrorCode errorCode) {
		super(errorCode);
	}
}
