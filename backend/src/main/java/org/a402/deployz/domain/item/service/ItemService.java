package org.a402.deployz.domain.item.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.item.exception.ItemNotFoundException;
import org.a402.deployz.domain.item.repository.ItemRepository;
import org.a402.deployz.domain.item.response.ItemListResponse;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.exception.ProjectNotFoundException;
import org.a402.deployz.domain.project.repository.ProjectRepository;
import org.a402.deployz.domain.project.response.ProjectResponse;
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
	public List<ItemListResponse> findItem(long projectIdx) {
		List<ItemListResponse> result = new ArrayList<>();
		LocalDateTime mostLastSuccessTime = null;
		LocalDateTime mostLastFailureTime = null;

		try {
			Project project = projectRepository.findByIdx(projectIdx).orElseThrow();
			List<Item> items = project.getItems();

			// 가장 최근 성공시간과 실패 시간을 확인하기 위함
			mostLastSuccessTime = items.get(0).getLastSuccessDate();
			mostLastFailureTime = items.get(0).getLastFailureDate();

			for (Item item : items) {
				String status = "";
				// 최근 성공시간이 최근 실패시간 보다 이후 -> SUCCESS
				LocalDateTime successDate = item.getLastSuccessDate();
				LocalDateTime failureDate = item.getLastFailureDate();

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
					result.add(new ItemListResponse(item, status));
				}
			}
		} catch (Exception e) {
			// 예외 발생 시 처리
			e.printStackTrace();
			// 혹은 throw new CustomException("오류 메시지");
		}

		//projectService.modifyProject(mostLastSuccessTime, mostLastFailureTime, projectIdx);
		return result;
	}

}
