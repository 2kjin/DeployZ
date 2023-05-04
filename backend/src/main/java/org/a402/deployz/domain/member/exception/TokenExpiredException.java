package org.a402.deployz.domain.member.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class TokenExpiredException extends GlobalBaseException {
	public TokenExpiredException() {
		super(GlobalErrorCode.TOKEN_EXPIRED);
	}
}
