package org.a402.deployz.global.error;

public class GlobalBaseException extends RuntimeException {
	private final GlobalErrorCode errorCode;

	public GlobalBaseException(GlobalErrorCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}

	public GlobalErrorCode getErrorCode() {
		return errorCode;
	}

}
