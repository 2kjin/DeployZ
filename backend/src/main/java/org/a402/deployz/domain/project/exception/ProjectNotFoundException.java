package org.a402.deployz.domain.project.exception;

import org.a402.deployz.global.error.GlobalBaseException;
import org.a402.deployz.global.error.GlobalErrorCode;

public class ProjectNotFoundException extends GlobalBaseException {

  public ProjectNotFoundException(GlobalErrorCode errorCode) {
    super(GlobalErrorCode.OTHER);
  }
}
