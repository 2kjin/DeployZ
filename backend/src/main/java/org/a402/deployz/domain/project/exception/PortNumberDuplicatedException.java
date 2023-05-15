package org.a402.deployz.domain.project.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;
		public class PortNumberDuplicatedException extends GlobalBaseException {
			public PortNumberDuplicatedException() {
				super(GlobalErrorCode.DUPLICATE_PORT_NUMBER);
			}
		}