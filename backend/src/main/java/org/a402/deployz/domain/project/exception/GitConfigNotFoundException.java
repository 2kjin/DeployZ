package org.a402.deployz.domain.project.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class GitConfigNotFoundException extends GlobalBaseException {
	public GitConfigNotFoundException() {
		super(GlobalErrorCode.GIT_TOKEN_NOT_FOUND);
	}
}
