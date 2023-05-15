package org.a402.deployz.domain.project.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class PortNumberOutOfRangeException extends GlobalBaseException {
	public PortNumberOutOfRangeException() {
		super(GlobalErrorCode.OUT_OF_RANGE_PORT_NUM);
	}
}