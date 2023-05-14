package org.a402.deployz.domain.deploy.service;

import org.a402.deployz.domain.deploy.common.CommandInterpreter;
import org.a402.deployz.domain.deploy.common.FileManager;
import org.a402.deployz.domain.deploy.util.docker.DockerCommandGenerator;
import org.a402.deployz.domain.deploy.util.docker.DockerfileGenerator;
import org.a402.deployz.domain.deploy.util.gitlab.GitAdapter;
import org.a402.deployz.domain.deploy.common.PathParser;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeployService {

	private final MemberRepository memberRepository;
	private final BuildHistoryRepository buildHistoryRepository;
	private final ItemRepository itemRepository;
	private final PathParser pathParser;
	private final static String CLONE = "Clone";
	private final static String PULL = "Pull";
	private final static String WAITING = "WAITING";
	private final static String SUCCESS = "SUCCESS";
	private final static String FAIL = "FAIL";

	@Transactional
	public ItemDeployResponse itemDeploy(final Long itemIdx) {
		String gitAction = CLONE;
		String status = WAITING;

		// 회원 정보 조회
		// @FIXME: to use Authentication
		final Member member = memberRepository.findMemberByIdx(2L)
			.orElseThrow(MemberNotFoundException::new);
		// 아이템 조회
		final Item item = itemRepository.findItemByIdx(itemIdx).orElseThrow(ItemNotFoundException::new);
		// 프로젝트 조회
		final Project project = item.getProject();

		if (buildHistoryRepository.findBuildHistoryByItemIdx(itemIdx).size() > 0) {
			// 초기 상태가 아니면 Git Pull
			gitAction = PULL;
		}

		// 상태 결정 "Success" | "Fail" | "Waiting"
		// 초기 상태 WAITING 저장
		final BuildHistory buildHistory = addBuildHistory(item, status);

		// Path 설정
		final String projectPath = pathParser.getProjectPath(project.getProjectName()).toString();
		log.info("projectPath: {}", projectPath);
		final String logPath = pathParser.getLogPath(project.getProjectName()).toString();
		log.info("logPath: {}", logPath);
		final String itemPath = pathParser.getItemPath(project.getProjectName(), item.getName()).toString();
		log.info("itemPath: {}", itemPath);

		final String repositoryUrl = project.getGitConfig().getRepositoryUrl();
		final String repositoryName = GitAdapter.parseUrl(repositoryUrl).get(3).split("\\.")[0];
		final String repositoryPath = pathParser.getRepositoryPath(project.getProjectName(), item.getName(),
			repositoryName).toString();
		log.info("repositoryPath: {}", repositoryPath);

		if (gitAction.equals(CLONE)) {
			// git clone
			log.info("GitClone Start");
			final String cloneCommand = GitAdapter.getCloneCommand(item, member.getPersonalAccessToken());
			log.info("Clone Command: {}", cloneCommand);
			try {
				CommandInterpreter.runDestinationPath(projectPath, itemPath, logPath, gitAction, cloneCommand);
				log.info("Clone Success");
			} catch (Exception exception) {
				log.info("Clone Failure");
				status = FAIL;
				String message = FileManager.readFile(logPath, gitAction);
				modifyBuildHistory(buildHistory, status, message);
				return new ItemDeployResponse(status, "Git Clone 실패");
			}
		} else {
			// git pull
			log.info("GitPull Start");
			final String pullCommand = GitAdapter.getPullCommand(item.getBranchName());
			log.info("Pull Command: {}", pullCommand);
			try {
				CommandInterpreter.runDestinationPath(repositoryPath, logPath, gitAction, pullCommand);
				log.info("Pull Success");
			} catch (Exception exception) {
				log.info("Pull Failure");
				status = FAIL;
				String message = FileManager.readFile(logPath, gitAction);
				modifyBuildHistory(buildHistory, status, message);
				return new ItemDeployResponse(status, "Git Pull 실패");
			}
		}

		// Dockerfile generate
		DockerfileGenerator.checkDockerfileType(item, repositoryPath);

		// Docker build
		String buildCommand = DockerCommandGenerator.build(item, repositoryPath);
		log.info("build Command: {}", buildCommand);
		try {
			CommandInterpreter.run(logPath, "Build", buildCommand);
			log.info("Docker Build Success");
		} catch (Exception exception) {
			log.info("Docker Build Failure");
			status = FAIL;
			String message = FileManager.readFile(logPath, "Build");
			modifyBuildHistory(buildHistory, status, message);
			return new ItemDeployResponse(status, "Docker Build 실패");
		}

		// Docker Run
		String runCommand = DockerCommandGenerator.run(item);
		log.info("run Command: {}", runCommand);
		try {
			CommandInterpreter.run(logPath, "Run", runCommand);
			log.info("Docker Run Success");
		} catch (Exception exception) {
			log.info("Docker Run Failure");
			status = FAIL;
			String message = FileManager.readFile(logPath, "Run");
			modifyBuildHistory(buildHistory, status, message);
			return new ItemDeployResponse(status, "Docker Run 실패");
		}

		// 최종 build_history 저장
		status = SUCCESS;
		StringBuilder sb = new StringBuilder();
		String message1 = FileManager.readFile(logPath, "Build");
		String message2 = FileManager.readFile(logPath, "Run");
		sb.append(message1).append("\n\n").append(message2);
		modifyBuildHistory(buildHistory, status, sb.toString());

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
	public void modifyBuildHistory(final BuildHistory buildHistory, final String status, final String message) {
		buildHistory.updateStatus(status, message);
	}

}
