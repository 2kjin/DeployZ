package org.a402.deployz.domain.member.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class AlreadyMemberRegisterException extends GlobalBaseException {
	public AlreadyMemberRegisterException() {
		super(GlobalErrorCode.MEMBER_ALREADY_REGISTERED);
	}
}
