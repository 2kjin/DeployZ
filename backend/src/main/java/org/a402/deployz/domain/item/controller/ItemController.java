package org.a402.deployz.domain.item.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.a402.deployz.domain.item.response.ItemListResponse;
import org.a402.deployz.domain.item.service.ItemService;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.repository.ProjectRepository;
import org.a402.deployz.global.common.BaseResponse;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//	| orderList() | 목록 조회 유형의 서비스 |
//	| orderDetails() | 단 건 상세 조회 유형의 controller 메서드 |
//	| orderSave() | 등록/수정/삭제 가 동시에 일어나는 유형의 controller 메서드 |
//	| orderAdd() | 등록만 하는 유형의 controller 메서드 |
//	| orderModify() | 수정만 하는 유형의 controller 메서드 |
//	| orderRemove() | 삭제만 하는 유형의 controller 메서드 |
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/item")
@Tag(name = "Container", description = "컨테이너 관련 API")
@Slf4j
public class ItemController {

	private final ItemService itemService;
	private final ProjectRepository projectRepository;

	@ApiResponse(responseCode = "200", description = "컨테이너 삭제 성공")
	@Operation(description = "컨테이너 삭제 API", summary = "컨테이너 삭제 API")
	@DeleteMapping("/{containerIdx}")
	public BaseResponse<Void> ItemRemove(@Valid @PathVariable Long containerIdx) {
		itemService.removeItem(containerIdx);
		return new BaseResponse<>(GlobalErrorCode.SUCCESS);
	}

	/*
	* 1. 아이템 목록을 불러온다
	* 2. 아이템들 중에서 가장 최근 성공과 가장 최근 실패를 가져온다 -> itemName, time
	* */
	@ApiResponse(responseCode = "200", description = "컨테이너 리스트 조회 성공")
	@Operation(description = "컨테이너 리스트 조회 API", summary = "컨테이너 리스트 조회 API")
	@GetMapping("/{projectIdx}")
	public BaseResponse <List<ItemListResponse>> ItemList(@Valid @PathVariable Long projectIdx) {
		//프로젝트idx의 프로젝트 제목 반환
		Optional<Project> project= projectRepository.findByIdx(projectIdx);
		String projectName=project.get().getProjectName();
		List<ItemListResponse> itemList = itemService.findItem(projectIdx,projectName);

		return  new BaseResponse<>(itemList);
	}


}
