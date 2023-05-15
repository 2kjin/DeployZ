package org.a402.deployz.domain.project.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class DuplicateProjectIdException extends GlobalBaseException {
	public DuplicateProjectIdException() {
		super(GlobalErrorCode.DUPLICATE_PROJECT_ID);
	}
}
