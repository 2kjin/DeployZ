package org.a402.deployz.domain.project.service;

import static org.a402.deployz.domain.project.entity.enums.FrameworkType.*;
import static org.a402.deployz.domain.project.entity.enums.ReactVersion.*;
import static org.a402.deployz.domain.project.entity.enums.SpringBootVersion.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.a402.deployz.domain.deploy.entity.Deploy;
import org.a402.deployz.domain.deploy.repository.BuildHistoryRepository;
import org.a402.deployz.domain.git.entity.GitConfig;
import org.a402.deployz.domain.git.entity.GitHistory;
import org.a402.deployz.domain.git.entity.GitToken;
import org.a402.deployz.domain.git.repository.GitTokenRepository;
import org.a402.deployz.domain.item.entity.BuildHistory;
import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.item.repository.ItemRepository;
import org.a402.deployz.domain.item.request.ItemConfigRequest;
import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.exception.MemberNotFoundException;
import org.a402.deployz.domain.member.repository.MemberRepository;
import org.a402.deployz.domain.project.entity.NginxConfig;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.entity.ProjectState;
import org.a402.deployz.domain.project.entity.ProxyConfig;
import org.a402.deployz.domain.project.exception.DuplicateProjectIdException;
import org.a402.deployz.domain.project.exception.PortNumberDuplicatedException;
import org.a402.deployz.domain.project.exception.PortNumberInconsistentException;
import org.a402.deployz.domain.project.exception.PortNumberOutOfRangeException;
import org.a402.deployz.domain.project.exception.ProjectNotFoundException;
import org.a402.deployz.domain.project.repository.GitConfigRepository;
import org.a402.deployz.domain.project.repository.NginxConfigRepository;
import org.a402.deployz.domain.project.repository.ProjectRepository;
import org.a402.deployz.domain.project.repository.ProxyConfigRepository;
import org.a402.deployz.domain.project.request.NginxConfigRequest;
import org.a402.deployz.domain.project.request.TotalProjectConfigRequest;
import org.a402.deployz.domain.project.response.ProjectResponse;
import org.a402.deployz.domain.project.vo.BuildInformationVO;
import org.a402.deployz.global.security.jwt.JwtTokenProvider;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {
	private final ProjectRepository projectRepository;
	private final MemberRepository memberRepository;
	private final GitConfigRepository gitConfigRepository;
	private final NginxConfigRepository nginxConfigRepository;
	private final ProxyConfigRepository proxyConfigRepository;
	private final ItemRepository itemRepository;
	private final GitTokenRepository gitTokenRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final BuildHistoryRepository buildHistoryRepository;

	@Transactional
	public void addProject(final TotalProjectConfigRequest request, final UserDetails userDetails) {
		// Project 저장
		final Member member = memberRepository.findMemberByAccount(userDetails.getUsername())
			.orElseThrow(MemberNotFoundException::new);
		final Project project = projectRepository.save(request.getProjectConfig().toEntity(member));

		final Integer projectId = request.getProjectConfig().getProjectId();

		// GitConfig 저장
		if (gitConfigRepository.existsByProjectIdAndDeletedFlagIsFalse(projectId)) {
			throw new DuplicateProjectIdException();
		}

		final GitConfig gitConfig = gitConfigRepository.save(request.getProjectConfig().toGEntity(project));

		// Item 저장
		for (int i = 0; i < request.getItemList().size(); i++) {
			final ItemConfigRequest itemConfigRequest = request.getItemList().get(i);
			itemRepository.save(itemConfigRequest.toEntity(project));

			// GitToken 저장
			final GitToken gitToken = GitToken.builder()
				.secretToken(passwordEncoder.encode(itemConfigRequest.getSecretToken()))
				.branchName(itemConfigRequest.getBranchName())
				.gitConfig(gitConfig)
				.build();

			gitTokenRepository.save(gitToken);
		}

		// NginxConfig 저장
		final NginxConfigRequest nginxConfigRequest = request.getNginxConfig();
		final NginxConfig nginxConfig = nginxConfigRepository.save(nginxConfigRequest.toEntity(project));

		// ProxyConfig 저장
		for (int i = 0; i < nginxConfigRequest.getProxyPathList().size(); i++) {
			proxyConfigRepository.save(nginxConfigRequest.getProxyPathList().get(i).toEntity(nginxConfig));
		}
	}

	@Transactional
	public void removeProject(@Valid long projectIdx) {
		try {
			// 프로젝트 삭제
			final Project project = projectRepository.findProjectByIdxAndDeletedFlagIsFalse(projectIdx)
				.orElseThrow(ProjectNotFoundException::new);

			final List<Item> items = projectRepository.findProjectByIdxAndDeletedFlagIsFalse(projectIdx)
				.orElseThrow(ProjectNotFoundException::new).getItems();

			project.updateDeletedFlag();

			final GitConfig gitConfig = project.getGitConfig();
			gitConfig.updateDeletedFlag();

			final List<GitHistory> gitHistories = gitConfig.getGitHistories();

			for (GitHistory gitHistory : gitHistories) {
				gitHistory.updateDeletedFlag();
			}

			final List<GitToken> gitTokens = gitConfig.getGitTokens();

			for (GitToken gitToken : gitTokens) {
				gitToken.updateDeletedFlag();
			}

			final List<ProjectState> projectStates = project.getProjectStates();

			for (ProjectState projectState : projectStates) {
				projectState.updateDeletedFlag();
			}

			final NginxConfig nginxConfig = project.getNginxConfig();
			nginxConfig.updateDeletedFlag();

			final List<ProxyConfig> proxyConfigs = nginxConfig.getProxyConfigs();

			for (ProxyConfig proxyConfig : proxyConfigs) {
				proxyConfig.updateDeletedFlag();
			}

			for (final Item item : items) {
				//해당 projectIdx의 item들도 삭제
				item.updateDeletedFlag();

				final Long itemIdx = item.getIdx();
				final List<BuildHistory> buildHistories = buildHistoryRepository.findBuildHistoryByItemIdxAndDeletedFlagIsFalse(
					itemIdx);

				// Item idx에 해당하는 빌드 기록 삭제
				for (final BuildHistory buildHistory : buildHistories) {
					buildHistory.updateDeletedFlag();
				}

				// Item idx에 해당하는 deploy 삭제
				final List<Deploy> deploys = item.getDeploys();
				for (Deploy deploy : deploys) {
					deploy.updateDeletedFlag();
				}
			}

		} catch (Exception e) {
			log.error("Error deleting project with ID {}: {}", projectIdx, e.getMessage());
			throw new RuntimeException("Failed to delete project", e);
		}
	}

	@Transactional
	public List<String> findFrameworkTypeList() {
		return getFrameworkNames();
	}

	public List<String> findBuildVersionList(String frameworkType) {
		List<String> names = null;

		if (frameworkType.equals(REACT.getName())) {
			names = getReactVersion();
		} else if (frameworkType.equals(SPRINGBOOT.getName())) {
			names = getSpringBootVersion();
		}

		return names;
	}

	@Transactional
	public void findPortNumCheckList(String port) {
		for (char c : port.toCharArray()) {
			if (!Character.isDigit(c)) {
				throw new PortNumberInconsistentException();
			}
		}
		int portByInt = Integer.parseInt(port);
		if (portByInt < 0 || portByInt > 65535 || portByInt == 80 || portByInt == 443) {
			throw new PortNumberOutOfRangeException();
		}
		if (itemRepository.existsByPortNumberAndDeletedFlagIsFalse((long)portByInt)) {
			throw new PortNumberDuplicatedException();
		}
	}

	@Transactional(readOnly = true)
	public Project findProject(final long projectIdx) {
		return projectRepository.findProjectByIdxAndDeletedFlagIsFalse(projectIdx)
			.orElseThrow(ProjectNotFoundException::new);
	}

	// staus를 확인하기 위한 코드
	@Transactional(readOnly = true)
	public List<ProjectResponse> findProjectList(final String account) {
		final Member member = memberRepository.findMemberByAccount(account).orElseThrow(MemberNotFoundException::new);
		final List<Project> projects = projectRepository.findProjectsByMemberIdxAndDeletedFlagIsFalse(member.getIdx());

		final List<ProjectResponse> result = new ArrayList<>();

		for (Project project : projects) {
			final List<Item> items = project.getItems();
			final List<BuildInformationVO> itemBuildStatus = new ArrayList<>();

			for (final Item item : items) {
				// 하나의 item에 대한 가장 최근의 빌드 내역.
				final List<BuildHistory> buildHistories = buildHistoryRepository.findBuildHistoriesByItemAndDeletedFlagIsFalseOrderByRegisterTimeDesc(
					item);

				if (buildHistories.size() > 0) {
					final BuildHistory buildHistory = buildHistories.get(0);

					// 가장 최근의 status를 저장.
					itemBuildStatus.add(
						new BuildInformationVO(buildHistory.getStatus(), buildHistory.getRegisterTime()));
				}
			}

			String projectStatus = "SUCCESS";

			for (final BuildInformationVO buildInformationVO : itemBuildStatus) {
				if ("SUCCESS".equals(buildInformationVO.getStatus())) {
					continue;
				}

				projectStatus = "FAIL";
				break;
			}

			final List<LocalDateTime> lastSuccessDates = buildHistoryRepository.lastSuccessDate(project.getIdx());
			final List<LocalDateTime> lastFailureDates = buildHistoryRepository.lastFailureDate(project.getIdx());
			LocalDateTime lastSuccessDate = null;
			LocalDateTime lastFailureDate = null;

			if (lastSuccessDates.size() > 0) {
				lastSuccessDate = lastSuccessDates.get(0);
			}

			if (lastFailureDates.size() > 0) {
				lastFailureDate = lastFailureDates.get(0);
			}

			//브랜치명-> HashMap으로 반환
			final HashMap<String, Integer> branches = findItemListByProjectIdx(project.getIdx());
			result.add(new ProjectResponse(project, projectStatus, branches, lastSuccessDate, lastFailureDate));
		}

		return result;
	}

	@Transactional
	public HashMap<String, Integer> findItemListByProjectIdx(Long projectIdx) {
		final HashMap<String, Integer> branches = new HashMap<>();

		final Project project = projectRepository.findProjectByIdxAndDeletedFlagIsFalse(projectIdx)
			.orElseThrow(ProjectNotFoundException::new);
		final List<Item> items = project.getItems();

		if (items != null) {
			for (Item item : items) {
				final String branchName = item.getBranchName();
				final Integer branchBuildCnt = item.getItemHistories().size();

				branches.put(branchName, branchBuildCnt);
			}
		}

		return branches;
	}

	public String createSecretToken(final String branchName, final String account) {
		final Member member = memberRepository.findMemberByAccount(account).orElseThrow(MemberNotFoundException::new);

		return jwtTokenProvider.createSecretToken(member, branchName);
	}
}