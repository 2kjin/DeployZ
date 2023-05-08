package org.a402.deployz.domain.deploy;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class UrlInvalidFormatException extends GlobalBaseException {
	public UrlInvalidFormatException() {
		super(GlobalErrorCode.URL_INVALID_FORMAT);
	}
}
