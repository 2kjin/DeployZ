package org.a402.deployz.domain.project.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.a402.deployz.domain.project.request.TotalProjectConfigRequest;
import org.a402.deployz.domain.project.service.ProjectService;
import org.a402.deployz.global.common.BaseResponse;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//	| orderList() | 목록 조회 유형의 서비스 |
//	| orderDetails() | 단 건 상세 조회 유형의 controller 메서드 |
//	| orderSave() | 등록/수정/삭제 가 동시에 일어나는 유형의 controller 메서드 |
//	| orderAdd() | 등록만 하는 유형의 controller 메서드 |
//	| orderModify() | 수정만 하는 유형의 controller 메서드 |
//	| orderRemove() | 삭제만 하는 유형의 controller 메서드 |
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/project")
@Tag(name = "Project", description = "프로젝트 관련 API")
@Slf4j
public class ProjectController {

  private final ProjectService projectService;

  @ApiResponse(responseCode = "200", description = "프로젝트 생성 성공")
  @Operation(description = "프로젝트 생성 API", summary = "프로젝트 생성 API")
  @PostMapping()
  public BaseResponse<Void> projectAdd(@Valid @RequestBody TotalProjectConfigRequest request) {
    projectService.addProject(request);
    return new BaseResponse<>(GlobalErrorCode.SUCCESS);
  }

  @ApiResponse(responseCode = "200", description = "프로젝트 삭제 성공")
  @Operation(description = "프로젝트 삭제 API", summary = "프로젝트 삭제 API")
  @DeleteMapping("/{projectIdx}")
  public BaseResponse<Void> projectRemove(@Valid @RequestParam long idx) {
    projectService.removeProject(idx);
    return new BaseResponse<>(GlobalErrorCode.SUCCESS);
  }

}
