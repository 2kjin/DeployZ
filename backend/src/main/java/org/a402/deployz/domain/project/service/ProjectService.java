package org.a402.deployz.domain.project.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.a402.deployz.domain.git.entity.GitConfig;
import org.a402.deployz.domain.git.entity.GitToken;
import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.item.repository.ItemRepository;
import org.a402.deployz.domain.item.request.ItemConfigRequest;
import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.repository.MemberRepository;
import org.a402.deployz.domain.project.entity.NginxConfig;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.exception.ProjectNotFoundException;
import org.a402.deployz.domain.member.exception.MemberNotFoundException;
import org.a402.deployz.domain.project.repository.GitConfigRepository;
import org.a402.deployz.domain.project.repository.GitTokenRepository;
import org.a402.deployz.domain.project.repository.NginxConfigRepository;
import org.a402.deployz.domain.project.repository.ProjectRepository;
import org.a402.deployz.domain.project.repository.ProxyConfigRepository;
import org.a402.deployz.domain.project.request.NginxConfigRequest;
import org.a402.deployz.domain.project.request.TotalProjectConfigRequest;
import org.a402.deployz.domain.project.response.ProjectResponse;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.apache.catalina.session.PersistentManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static org.a402.deployz.domain.project.entity.enums.FrameworkType.*;
import static org.a402.deployz.domain.project.entity.enums.ReactVersion.getReactVersion;
import static org.a402.deployz.domain.project.entity.enums.SpringBootVersion.getSpringBootVersion;

import javax.persistence.EntityManager;
import javax.validation.Valid;

//  | findOrder() | 조회 유형의 service 메서드 |
//  | addOrder() | 등록 유형의 service 메서드 |
//  | modifyOrder() | 변경 유형의 service 메서드 |
//  | removeOrder() | 삭제 유형의 service 메서드 |
//  | saveOrder() | 등록/수정/삭제 가 동시에 일어나는 유형의 service 메서드 |
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
	private final EntityManager entityManager;

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
			projectRepository.findByIdx(projectIdx)
				.orElseThrow(() -> new ProjectNotFoundException(GlobalErrorCode.PROJECT_NOT_FOUND))
				.updateDeletedFlag();

			//해당 projectIdx의 item들도 삭제
			List<Item> items=projectRepository.findByIdx(projectIdx).orElseThrow(() -> new ProjectNotFoundException(GlobalErrorCode.PROJECT_NOT_FOUND)).getItems();

			for (Item item: items){
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
		portCheck.put("port1", !itemRepository.existsByPortNumber1(port1));
		portCheck.put("port2", !itemRepository.existsByPortNumber2(port2));
		return portCheck;
	}

	// staus를 확인하기 위한 코드
	@Transactional(readOnly = true)
	public List<ProjectResponse> findProject(long memberIdx) {
		List<Project> tmp;
		try {
			tmp = projectRepository.findByMemberIdx(memberIdx);
		} catch (Exception e) {
			log.error("Error finding projects for member with ID {}: {}", memberIdx, e.getMessage());
			throw new RuntimeException("Failed to find projects for member", e);
		}

		Long itemCnt = null;
		List<ProjectResponse> result = new ArrayList<>();

		for (Project project : tmp) {
			String status = null;

			try {
				//최근 성공시간이 최근 실패시간 보다 이후 -> SUCCESS
				LocalDateTime successDate = project.getLastSuccessDate();
				LocalDateTime failureDate = project.getLastFailureDate();

				//failureDate가 더 이후: 음수값 반환 / successDate가 더 최근: 양수 반환

				Duration duration = Duration.between(failureDate, successDate);
				// 초 단위 차이
				long diffInSeconds = duration.getSeconds();
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
			result.add(new ProjectResponse(project, status, itemCnt));
		}
		return result;
	}

	@Transactional
	public void modifyProject(LocalDateTime mostLastSuccessTime, LocalDateTime mostLastFailureTime,
		Long projectIdx) {
		//프로젝트의 최근 성공시간과 최근 실패 시간 업데이트

		 projectRepository.findProjectByIdx(projectIdx)
			.orElseThrow(() -> new ProjectNotFoundException(GlobalErrorCode.PROJECT_NOT_FOUND));


	}
}
