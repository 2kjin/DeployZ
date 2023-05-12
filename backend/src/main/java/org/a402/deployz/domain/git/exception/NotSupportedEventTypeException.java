package org.a402.deployz.domain.git.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class NotSupportedEventTypeException extends GlobalBaseException {
	public NotSupportedEventTypeException() {
		super(GlobalErrorCode.NOT_SUPPORTED_EVENT_TYPE);
	}
}
