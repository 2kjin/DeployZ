package org.a402.deployz.domain.item.controller;

import javax.validation.Valid;

import org.a402.deployz.domain.item.repository.ItemRepository;
import org.a402.deployz.domain.item.service.ItemService;
import org.a402.deployz.domain.project.service.ProjectService;
import org.a402.deployz.global.common.BaseResponse;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/item")
@Tag(name = "Container", description = "컨테이너 관련 API")
@Slf4j
public class ItemController {

	private final ItemService itemService;

	@ApiResponse(responseCode = "200", description = "컨테이너 삭제 성공")
	@Operation(description = "컨테이너 삭제 API", summary = "컨테이너 삭제 API")
	@DeleteMapping("/{containerIdx}")
	public BaseResponse<Void> ItemRemove(@Valid @RequestParam long idx) {
		itemService.removeItem(idx);
		return new BaseResponse<>(GlobalErrorCode.SUCCESS);
	}


}
