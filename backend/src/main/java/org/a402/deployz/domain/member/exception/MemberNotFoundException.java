package org.a402.deployz.domain.member.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class MemberNotFoundException extends GlobalBaseException {
	public MemberNotFoundException() {
		super(GlobalErrorCode.MEMBER_NOT_FOUND);
	}
}
