package org.a402.deployz.domain.item.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.a402.deployz.domain.item.entity.BuildHistory;
import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.item.exception.ItemNotFoundException;
import org.a402.deployz.domain.item.repository.ItemRepository;
import org.a402.deployz.domain.item.response.ItemBuildHistoryResponse;
import org.a402.deployz.domain.item.response.ItemListResponse;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.repository.ProjectRepository;
import org.a402.deployz.domain.project.service.ProjectService;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

//  | findOrder() | 조회 유형의 service 메서드 |
//  | addOrder() | 등록 유형의 service 메서드 |
//  | modifyOrder() | 변경 유형의 service 메서드 |
//  | removeOrder() | 삭제 유형의 service 메서드 |
//  | saveOrder() | 등록/수정/삭제 가 동시에 일어나는 유형의 service 메서드 |
@Service
@RequiredArgsConstructor
public class ItemService {
	private final ItemRepository itemRepository;
	private final ProjectRepository projectRepository;
	private final ProjectService projectService;

	@Transactional
	public void removeItem(long idx) {
		itemRepository.findItemByIdx(idx)
			.orElseThrow(() -> new ItemNotFoundException(GlobalErrorCode.ITEM_NOT_FOUND))
			.updateDeletedFlag();
	}

	@Transactional(readOnly = true)
	public List<Item> getItemList(final Project project) {
		return project.getItems();
	}

	@Transactional
	public List<ItemListResponse> updateStatusChangeTime(final Project project, final List<Item> itemList) {
		final List<ItemListResponse> result = new ArrayList<>();

		LocalDateTime mostLastSuccessTime = null;
		LocalDateTime mostLastFailureTime = null;

		try {
			// 가장 최근 성공시간과 실패 시간을 확인하기 위함
			mostLastSuccessTime = itemList.get(0).getLastSuccessDate();
			mostLastFailureTime = itemList.get(0).getLastFailureDate();

			for (Item item : itemList) {
				String status = "";
				// 최근 성공시간이 최근 실패시간 보다 이후 -> SUCCESS
				final LocalDateTime successDate = item.getLastSuccessDate();
				final LocalDateTime failureDate = item.getLastFailureDate();

				// failureDate가 더 이후: 음수값 반환 / successDate가 더 최근: 양수 반환
				Duration duration = Duration.between(failureDate, successDate);

				// 초 단위 차이
				long diffInSeconds = duration.getSeconds();

				if (diffInSeconds >= 0) {
					status = "SUCCESS";

					// 성공한 시간들 중에서 가장 최근에 성공한 시간을 저장
					if (successDate.isAfter(mostLastSuccessTime)) {
						mostLastSuccessTime = successDate;

					}
				} else {
					status = "FAIL";

					//실패한 시간들 중에서 가장 최근에 실패한 시간을 저장
					if (successDate.isAfter(mostLastFailureTime)) {
						mostLastFailureTime = successDate;
					}
				}
				if(!item.isDeletedFlag()) {
					result.add(new ItemListResponse(item, status,project.getProjectName()));
				}
			}
		} catch (Exception e) {
			// 예외 발생 시 처리
			e.printStackTrace();
			// 혹은 throw new CustomException("오류 메시지");
		}

		projectService.modifyProject(mostLastSuccessTime, mostLastFailureTime, project);

		return result;
	}

	@Transactional
	public List<ItemBuildHistoryResponse> findBuildHistories(Long containerIdx) {
		Item item = itemRepository.findItemByIdx(containerIdx)
			.orElseThrow(() -> new ItemNotFoundException(GlobalErrorCode.ITEM_NOT_FOUND));

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

	@Transactional
	public String findProjectName(Long containerIdx) {
		Item item = itemRepository.findById(containerIdx).orElseThrow(() -> new ItemNotFoundException(GlobalErrorCode.ITEM_NOT_FOUND));
		Project project = item.getProject();
		return project.getProjectName();
	}

	@Transactional
	public ItemListResponse findItemInfo(Long itemIdx, String nowState, String projectName) {
		Item item = itemRepository.findItemByIdx(itemIdx)
			.orElseThrow(() -> new ItemNotFoundException(GlobalErrorCode.ITEM_NOT_FOUND));
		return new ItemListResponse(item,nowState, projectName);
	}
}
