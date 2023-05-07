package org.a402.deployz.domain.project.service;

import static org.a402.deployz.domain.project.entity.enums.FrameworkType.*;
import static org.a402.deployz.domain.project.entity.enums.ReactVersion.*;
import static org.a402.deployz.domain.project.entity.enums.SpringBootVersion.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.a402.deployz.domain.git.entity.GitConfig;
import org.a402.deployz.domain.git.entity.GitToken;
import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.item.repository.ItemRepository;
import org.a402.deployz.domain.item.request.ItemConfigRequest;
import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.exception.MemberNotFoundException;
import org.a402.deployz.domain.member.repository.MemberRepository;
import org.a402.deployz.domain.project.entity.NginxConfig;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.exception.ProjectNotFoundException;
import org.a402.deployz.domain.project.repository.GitConfigRepository;
import org.a402.deployz.domain.project.repository.GitTokenRepository;
import org.a402.deployz.domain.project.repository.NginxConfigRepository;
import org.a402.deployz.domain.project.repository.ProjectRepository;
import org.a402.deployz.domain.project.repository.ProxyConfigRepository;
import org.a402.deployz.domain.project.request.NginxConfigRequest;
import org.a402.deployz.domain.project.request.TotalProjectConfigRequest;
import org.a402.deployz.domain.project.response.ProjectResponse;
import org.a402.deployz.global.error.GlobalErrorCode;
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

	@Transactional
	public void addProject(TotalProjectConfigRequest request, String userEmail) {
		// Project 저장
		Member member = memberRepository.findMemberByEmail(userEmail).orElseThrow(MemberNotFoundException::new);
		Project project = projectRepository.save(
			request.getProjectConfig().toEntity(member));

		// GitConfig 저장
		GitConfig gitConfig = gitConfigRepository.save(request.getProjectConfig().toGEntity(project));

		// Item 저장
		for (int i = 0; i < request.getItemList().size(); i++) {
			ItemConfigRequest itemConfigRequest = request.getItemList().get(i);
			itemRepository.save(itemConfigRequest.toEntity(project));

			// GitToken 저장
			GitToken gitToken = GitToken.builder()
				.secretToken(passwordEncoder.encode(itemConfigRequest.getSecretToken()))
				.branchName(itemConfigRequest.getBranchName())
				.gitConfig(gitConfig)
				.build();

			gitTokenRepository.save(gitToken);
		}

		// NginxConfig 저장
		NginxConfigRequest nginxConfigRequest = request.getNginxConfig();
		NginxConfig nginxConfig = nginxConfigRepository.save(nginxConfigRequest.toEntity(project));

		// ProxyConfig 저장
		for (int i = 0; i < nginxConfigRequest.getProxyPathList().size(); i++) {
			proxyConfigRepository.save(nginxConfigRequest.getProxyPathList().get(i).toEntity(nginxConfig));
		}
	}

	@Transactional
	public void removeProject(@Valid long projectIdx) {
		try {
			projectRepository.findProjectByIdx(projectIdx)
				.orElseThrow(() -> new ProjectNotFoundException(GlobalErrorCode.PROJECT_NOT_FOUND))
				.updateDeletedFlag();

			//해당 projectIdx의 item들도 삭제
			List<Item> items = projectRepository.findProjectByIdx(projectIdx)
				.orElseThrow(() -> new ProjectNotFoundException(GlobalErrorCode.PROJECT_NOT_FOUND))
				.getItems();

			for (Item item : items) {
				item.updateDeletedFlag();
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
	public HashMap<String, Boolean> findPortNumCheckList(Long port1, Long port2) {
		HashMap<String, Boolean> portCheck = new HashMap<>();

		//true: 사용 가능, false: 사용 불가
		if (itemRepository.existsByPortNumber1(port1) && itemRepository.existsByPortNumber2(port1)){
			portCheck.put("port1",true);
		}
		else portCheck.put("port1",false);

		if (itemRepository.existsByPortNumber1(port2) && itemRepository.existsByPortNumber2(port2)){
			portCheck.put("port2",true);
		}
		else portCheck.put("port2",false);

		return portCheck;
	}

	@Transactional(readOnly = true)
	public Project findProject(final long projectIdx) {
		return projectRepository.findProjectByIdx(projectIdx)
			.orElseThrow(() -> new ProjectNotFoundException(GlobalErrorCode.PROJECT_NOT_FOUND));
	}

	// staus를 확인하기 위한 코드
	@Transactional(readOnly = true)
	public List<ProjectResponse> findProjectList(final String email) {
		final Member member = memberRepository.findMemberByEmail(email).orElseThrow(MemberNotFoundException::new);
		List<Project> tmp;

		try {
			tmp = projectRepository.findProjectsByMemberIdx(member.getIdx());
		} catch (Exception e) {
			log.error("Error finding projects for member with ID {}: {}", member.getIdx(), e.getMessage());
			throw new RuntimeException("Failed to find projects for member", e);
		}

		long itemCnt;
		final List<ProjectResponse> result = new ArrayList<>();

		for (Project project : tmp) {
			String status;

			try {
				//최근 성공시간이 최근 실패시간 보다 이후 -> SUCCESS
				LocalDateTime successDate = project.getLastSuccessDate();
				LocalDateTime failureDate = project.getLastFailureDate();

				//failureDate가 더 이후: 음수값 반환 / successDate가 더 최근: 양수 반환
				Duration duration = Duration.between(failureDate, successDate);
				// 초 단위 차이
				final long diffInSeconds = duration.getSeconds();
				if (diffInSeconds >= 0)
					status = "SUCCESS";

				else
					status = "FAIL";

				//해당 프로젝트의 item 개수를 count
				itemCnt = itemRepository.countItemsByProjectIdx(project.getIdx());

			} catch (Exception e) {
				log.error("Error processing project with ID {}: {}", project.getIdx(), e.getMessage());
				status = "ERROR";
				itemCnt = 0L;
			}

			if (!project.isDeletedFlag()) {
				result.add(new ProjectResponse(project, status, itemCnt));
			}
		}

		return result;
	}
	@Transactional
	public void modifyProject(LocalDateTime mostLastSuccessTime, LocalDateTime mostLastFailureTime,
		Project project) {
		//프로젝트의 최근 성공시간과 최근 실패 시간 업데이트
		project.updateLastDates(mostLastSuccessTime, mostLastFailureTime);
		projectRepository.save(project);
	}

}
