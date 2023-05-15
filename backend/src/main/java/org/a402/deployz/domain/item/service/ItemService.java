package org.a402.deployz.domain.item.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.a402.deployz.domain.deploy.repository.BuildHistoryRepository;
import org.a402.deployz.domain.item.entity.BuildHistory;
import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.item.exception.ItemNotFoundException;
import org.a402.deployz.domain.item.repository.ItemRepository;
import org.a402.deployz.domain.item.response.ItemBuildHistoryResponse;
import org.a402.deployz.domain.item.response.ItemListResponse;
import org.a402.deployz.domain.project.entity.Project;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//  | findOrder() | 조회 유형의 service 메서드 |
//  | addOrder() | 등록 유형의 service 메서드 |
//  | modifyOrder() | 변경 유형의 service 메서드 |
//  | removeOrder() | 삭제 유형의 service 메서드 |
//  | saveOrder() | 등록/수정/삭제 가 동시에 일어나는 유형의 service 메서드 |
@Slf4j
@Service
@RequiredArgsConstructor
public class ItemService {
	private final ItemRepository itemRepository;
	private final BuildHistoryRepository buildHistoryRepository;

	@Transactional
	public void removeItem(long itemIdx) {
		itemRepository.findItemByIdx(itemIdx)
			.orElseThrow(ItemNotFoundException::new)
			.updateDeletedFlag();
	}

	@Transactional(readOnly = true)
	public List<Item> getItemList(final Project project) {
		return project.getItems();
	}

	@Transactional
	public List<ItemBuildHistoryResponse> findBuildHistories(Long itemIdx) {
		final Item item = itemRepository.findItemByIdx(itemIdx).orElseThrow(ItemNotFoundException::new);

		if (item.getItemHistories().size() > 0 && !item.isDeletedFlag()) {
			return item.getItemHistories()
				.stream()
				.sorted(Comparator.comparing(BuildHistory::getIdx).reversed())
				.map(history -> new ItemBuildHistoryResponse(
					history.getIdx(),
					history.getStatus(),
					history.getMessage(),
					history.getRegisterTime()))
				.collect(Collectors.toList());
		}
		else return null;
	}

	@Transactional
	public String findProjectName(Long itemIdx) {
		Item item = itemRepository.findById(itemIdx)
			.orElseThrow(ItemNotFoundException::new);
		Project project = item.getProject();
		return project.getProjectName();
	}

	@Transactional
	public ItemListResponse findItemInfo(Long itemIdx, String nowState, String projectName) {
		Item item = itemRepository.findItemByIdx(itemIdx)
			.orElseThrow(ItemNotFoundException::new);

		final List<BuildHistory> buildHistoryByItem = buildHistoryRepository.findBuildHistoryByItemOrderByRegisterTime(item);
		HashMap<String, LocalDateTime> lastRegisterTime = new HashMap<>();

		for (final BuildHistory buildHistory : buildHistoryByItem) {
			// 최근 성공시간과 실패 시간 key(중복 불가)
			if (lastRegisterTime.size() <= 2) {
				if (buildHistory.getStatus().equals("SUCCESS")) {
					lastRegisterTime.put("lastSuccessDate", buildHistory.getRegisterTime());
				} else
					lastRegisterTime.put("lastFailureDate", buildHistory.getRegisterTime());
			}
		}
		return new ItemListResponse(item, nowState, projectName,lastRegisterTime.get("lastSuccessDate"),lastRegisterTime.get("lastFailureDate"));
	}

// @Transactional
// public List<ItemListResponse> findItemListByProjectIdx(final Long projectIdx) {
// Project project = projectRepository.findProjectByIdx(projectIdx).orElseThrow(ProjectNotFoundException::new);
// List<Item> items = project.getItems();
//
// final List<ItemListResponse> result = new ArrayList<>();
//
// if (items.size() > 0){
//    for (Item item : items) {
//       String status = "";


// // 최근 성공시간이 최근 실패시간 보다 이후 -> SUCCESS
// final LocalDateTime successDate = item.getLastSuccessDate();
// final LocalDateTime failureDate = item.getLastFailureDate();
//
// if (successDate !=null && failureDate !=null ) {
//    // failureDate가 더 이후: 음수값 반환 / successDate가 더 최근: 양수 반환
//    Duration duration = Duration.between(failureDate, successDate);
//
//    // 초 단위 차이
//    long diffInSeconds = duration.getSeconds();
//
//    if (diffInSeconds >= 0) {
//       status = "SUCCESS";
//    } else {
//       status = "FAIL";
//    }
// }
//          if (!item.isDeletedFlag()) {
//             String projectName =findProjectName(item.getIdx());
//             result.add(new ItemListResponse(item, status, projectName));
//          }
//       }
   }