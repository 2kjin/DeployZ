package org.a402.deployz.domain.item.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.a402.deployz.domain.deploy.CommandInterpreter;
import org.a402.deployz.domain.deploy.GitAdapter;
import org.a402.deployz.domain.deploy.PathParser;
import org.a402.deployz.domain.item.entity.BuildHistory;
import org.a402.deployz.domain.item.entity.BuildItemRequest;
import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.item.exception.ItemNotFoundException;
import org.a402.deployz.domain.item.repository.ItemRepository;
import org.a402.deployz.domain.item.response.ItemBuildHistoryResponse;
import org.a402.deployz.domain.item.response.ItemListResponse;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.exception.ProjectNotFoundException;
import org.a402.deployz.domain.project.repository.ProjectRepository;
import org.a402.deployz.domain.project.service.ProjectService;
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
	private final ProjectRepository projectRepository;
	private final ProjectService projectService;
	private final PathParser pathParser;

	@Transactional
	public void removeItem(long idx) {
		itemRepository.findItemByIdx(idx)
			.orElseThrow(ItemNotFoundException::new)
			.updateDeletedFlag();
	}

	@Transactional(readOnly = true)
	public List<Item> getItemList(final Project project) {
		return project.getItems();
	}

	@Transactional
	public List<ItemBuildHistoryResponse> findBuildHistories(Long containerIdx) {
		final Item item = itemRepository.findItemByIdx(containerIdx).orElseThrow(ItemNotFoundException::new);

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
		return new ItemListResponse(item, nowState, projectName);
	}

	@Transactional
	public List<ItemListResponse> findItemListByProjectIdx(final Long projectIdx) {
		Project project = projectRepository.findProjectByIdx(projectIdx).orElseThrow(ProjectNotFoundException::new);
		List<Item> items = project.getItems();
		final List<ItemListResponse> result = new ArrayList<>();

		// 가장 최근 성공 및 실패시간 -> 업데이트
		// LocalDateTime mostLastSuccessTime = itemList.get(0).getLastSuccessDate();
		// LocalDateTime mostLastFailureTime = itemList.get(0).getLastFailureDate();

		if (items.size() > 0){
			for (Item item : items) {
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
				} else {
					status = "FAIL";
				}
				if (!item.isDeletedFlag()) {
					String projectName =findProjectName(item.getIdx());
					result.add(new ItemListResponse(item, status, projectName));
				}
			}
			// 가장 최근 성공 및 실패시간 -> 업데이트
			//projectService.modifyProject(mostLastSuccessTime, mostLastFailureTime, project);
		}
		return result;
	}

	@Transactional
	public void pullItem(final BuildItemRequest buildItemRequest) {
		log.info("pullStart Start : projectId = {} ", buildItemRequest.getProjectIdx());

		final Project project = projectRepository.findById(buildItemRequest.getProjectIdx())
			.orElseThrow(ProjectNotFoundException::new);
		final Item item = itemRepository.findById(buildItemRequest.getItemIdx())
			.orElseThrow(ItemNotFoundException::new);

		final String repositoryUrl = project.getGitConfig().getRepositoryUrl();
		final List<String> splitRepositoryUrl = GitAdapter.parseUrl(repositoryUrl);
		final String repositoryName = splitRepositoryUrl.get(3).split("\\.")[0];

		final String repositoryPath = pathParser.getRepositoryPath(project.getProjectName(), item.getBranchName(),
			repositoryName).toString();
		final String logPath = pathParser.getLogPath(project.getProjectName()).toString();
		final String command = GitAdapter.getPullCommand(item.getBranchName());

		log.info("git pull path: {}", repositoryPath);

		try {
			CommandInterpreter.runDestinationPath(repositoryPath, logPath, "Pull", command);
			log.info("Pull Success");
		} catch (Exception exception) {
			log.info("Pull Failure");
		}

		log.info("pullStart Done");
	}
}
