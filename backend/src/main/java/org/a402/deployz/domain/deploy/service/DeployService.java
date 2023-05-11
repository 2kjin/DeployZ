package org.a402.deployz.domain.deploy.service;

import org.a402.deployz.domain.deploy.CommandInterpreter;
import org.a402.deployz.domain.deploy.GitAdapter;
import org.a402.deployz.domain.deploy.PathParser;
import org.a402.deployz.domain.deploy.repository.BuildHistoryRepository;
import org.a402.deployz.domain.deploy.response.ItemDeployResponse;
import org.a402.deployz.domain.item.entity.BuildHistory;
import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.item.exception.ItemNotFoundException;
import org.a402.deployz.domain.item.repository.ItemRepository;
import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.exception.MemberNotFoundException;
import org.a402.deployz.domain.member.repository.MemberRepository;
import org.a402.deployz.domain.project.entity.Project;
import org.springframework.security.core.userdetails.UserDetails;
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
public class DeployService {

	private final MemberRepository memberRepository;
	private final BuildHistoryRepository buildHistoryRepository;
	private final ItemRepository itemRepository;
	private final PathParser pathParser;

	@Transactional
	public ItemDeployResponse itemDeploy(final Long itemIdx) {
		String gitAction = "Clone";
		String status = "Waiting";

		// 회원 정보 조회
		// @FIXME: to use Authentication
		final Member member = memberRepository.findMemberByIdx(2L)
			.orElseThrow(MemberNotFoundException::new);
		// 아이템 조회
		final Item item = itemRepository.findItemByIdx(itemIdx).orElseThrow(ItemNotFoundException::new);
		// 프로젝트 조회
		final Project project = item.getProject();

		// Git Clone, Pull 검사
		if (buildHistoryRepository.findBuildHistoryByIdx(itemIdx).isPresent()) {
			// 초기 상태가 아니면 Git Pull
			gitAction = "Pull";
		}

		// 상태 결정 "Success" | "Fail" | "Waiting"
		// 초기 build_history ("Waiting") 저장
		final BuildHistory buildHistory = addBuildHistory(item, status);

		// Git Clone | Git Pull
		// Path 설정
		final String projectPath = pathParser.getProjectPath(project.getProjectName()).toString();
		log.info("projectPath: {}", projectPath);
		final String logPath = pathParser.getLogPath(project.getProjectName()).toString();
		log.info("logPath: {}", logPath);
		final String itemPath = pathParser.getItemPath(project.getProjectName(), item.getName()).toString();
		log.info("itemPath: {}", itemPath);

		final String repositoryUrl = project.getGitConfig().getRepositoryUrl();
		final String repositoryName = GitAdapter.parseUrl(repositoryUrl).get(3).split("\\.")[0];
		final String repositoryPath = pathParser.getRepositoryPath(project.getProjectName(), item.getBranchName(),
			repositoryName).toString();
		log.info("repositoryPath: {}", repositoryPath);

		if (gitAction.equals("Clone")) {

			// git clone
			log.info("GitClone Start");
			final String cloneCommand = GitAdapter.getCloneCommand(item, member.getPersonalAccessToken());
			log.info("Clone Command: {}", cloneCommand);
			try {
				CommandInterpreter.runDestinationPath(projectPath, itemPath, logPath, gitAction, cloneCommand);
				log.info("Clone Success");
			} catch (Exception exception) {
				log.info("Clone Failure");
				status = "Fail";
				modifyBuildHistory(buildHistory, status);
				return new ItemDeployResponse(status, "Git Clone 실패");
			}

		} else {

			// git pull
			log.info("GitPull Start");
			final String pullCommand = GitAdapter.getPullCommand(item.getBranchName());

			log.info("git pull path: {}", repositoryPath);

			try {
				CommandInterpreter.runDestinationPath(repositoryPath, logPath, gitAction, pullCommand);
				log.info("Pull Success");
			} catch (Exception exception) {
				log.info("Pull Failure");
				status = "Fail";
				modifyBuildHistory(buildHistory, status);
				return new ItemDeployResponse(status, "Git Pull 실패");
			}

		}

		// 최종 build_history 저장 ("SUCCESS" | "FAIL")
		modifyBuildHistory(buildHistory, status);

		return new ItemDeployResponse(status, "배포 성공");
	}

	@Transactional(readOnly = true)
	public BuildHistory addBuildHistory(final Item item, final String status) {
		final BuildHistory buildHistory = BuildHistory.builder()
			.status(status)
			.item(item)
			.build();
		buildHistoryRepository.save(buildHistory);

		return buildHistory;
	}

	@Transactional(readOnly = true)
	public void modifyBuildHistory(final BuildHistory buildHistory, final String status) {
		buildHistory.updateStatus(status);
	}

}
