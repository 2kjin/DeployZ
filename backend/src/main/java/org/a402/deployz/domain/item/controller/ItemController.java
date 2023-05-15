package org.a402.deployz.domain.item.controller;

import java.util.List;

import javax.validation.Valid;

import org.a402.deployz.domain.item.response.ItemBuildHistoryResponse;
import org.a402.deployz.domain.item.response.ItemDetailListResponse;
import org.a402.deployz.domain.item.response.ItemListResponse;
import org.a402.deployz.domain.item.service.ItemService;
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

	@ApiResponse(responseCode = "200", description = "컨테이너 삭제 성공")
	@Operation(description = "컨테이너 삭제 API", summary = "컨테이너 삭제 API")
	@DeleteMapping("/{itemIdx}")
	public BaseResponse<Void> ItemRemove(@Valid @PathVariable Long itemIdx) {
		itemService.removeItem(itemIdx);

		return new BaseResponse<>(GlobalErrorCode.SUCCESS);
	}

	@ApiResponse(responseCode = "200", description = "컨테이너 리스트 조회 성공")
	@Operation(description = "컨테이너 리스트 조회 API", summary = "컨테이너 리스트 조회 API")
	@GetMapping("/{projectIdx}")
	public BaseResponse<List<ItemListResponse>> findItemList(@Valid @PathVariable Long projectIdx) {
		final List<ItemListResponse> itemListResponses = itemService.findItemListByProjectIdx(projectIdx);

		return new BaseResponse<>(itemListResponses);
	}

	@ApiResponse(responseCode = "200", description = "컨테이너 상세 조회 성공")
	@Operation(description = "컨테이너 상세 조회 API", summary = "컨테이너 상세 조회 API")
	@GetMapping("/detail/{itemIdx}")
	public BaseResponse<ItemDetailListResponse> findDetailItem(@Valid @PathVariable Long itemIdx) {
		ItemDetailListResponse itemDetailListRespons = null;
		String nowState = "";
		ItemListResponse itemInfo = null;

		final List<ItemBuildHistoryResponse> buildHistories = itemService.findBuildHistories(itemIdx);

		if (buildHistories != null) {
			// 포트번호, 빌드상태, 최근 성공, 최근 실패 리스트 조회, 아이템 이름: ItemListResponse
			// 빌드 상태의 경우 -> buildHistories의 가장 최근값의 status를 반환
			nowState = buildHistories.get(0).getStatus();
		}
		// 해당 itemIdx를 가진 프로젝트 이름 반환
		String projectName = itemService.findProjectName(itemIdx);
		// 아이템의 정보들을 ItemListResponse Dto에 넣음
		itemInfo = itemService.findItemInfo(itemIdx, nowState, projectName);

		itemDetailListRespons = new ItemDetailListResponse(buildHistories, itemInfo);

		return new BaseResponse<>(itemDetailListRespons);
	}
}
