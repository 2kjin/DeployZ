package org.a402.deployz.domain.project.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class PortNumberInconsistentException extends GlobalBaseException {
	public PortNumberInconsistentException() {
		super(GlobalErrorCode.INCONSISTENT_PORT_NUMBER);
	}
}
