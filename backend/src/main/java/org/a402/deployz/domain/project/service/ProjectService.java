package org.a402.deployz.domain.project.service;

import lombok.RequiredArgsConstructor;
import org.a402.deployz.domain.git.entity.GitConfig;
import org.a402.deployz.domain.git.entity.GitToken;
import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.repository.MemberRepository;
import org.a402.deployz.domain.project.entity.NginxConfig;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.exception.ProjectNotFoundException;
import org.a402.deployz.domain.project.repository.GitConfigRepository;
import org.a402.deployz.domain.project.repository.GitTokenRepository;
import org.a402.deployz.domain.project.repository.ItemRepository;
import org.a402.deployz.domain.project.repository.NginxConfigRepository;
import org.a402.deployz.domain.project.repository.ProjectRepository;
import org.a402.deployz.domain.project.repository.ProxyConfigRepository;
import org.a402.deployz.domain.project.request.ItemConfigRequest;
import org.a402.deployz.domain.project.request.NginxConfigRequest;
import org.a402.deployz.domain.project.request.TotalProjectConfigRequest;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//  | findOrder() | 조회 유형의 service 메서드 |
//  | addOrder() | 등록 유형의 service 메서드 |
//  | modifyOrder() | 변경 유형의 service 메서드 |
//  | removeOrder() | 삭제 유형의 service 메서드 |
//  | saveOrder() | 등록/수정/삭제 가 동시에 일어나는 유형의 service 메서드 |
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

  private final ProjectRepository projectRepository;
  private final MemberRepository memberRepository;
  private final GitConfigRepository gitConfigRepository;
  private final NginxConfigRepository nginxConfigRepository;
  private final ProxyConfigRepository proxyConfigRepository;
  private final ItemRepository itemRepository;
  private final GitTokenRepository gitTokenRepository;

  @Transactional
  public void addProject(TotalProjectConfigRequest request) {

    // Project 저장
    // @FIXME: need token parsing
    Member member = memberRepository.findMemberByEmail("eunjikim8784@gmail.com");
    Project project = projectRepository.save(
        request.getProjectConfig().toEntity(member));

    // GitConfig 저장
    GitConfig gitConfig = gitConfigRepository.save(request.getGitConfig().toEntity(project));

    // Item 저장
    for (int i = 0; i < request.getItemList().size(); i++) {
      ItemConfigRequest itemConfigRequest = request.getItemList().get(i);
      itemRepository.save(itemConfigRequest.toEntity(project));
      // GitToken 저장
      GitToken gitToken = GitToken.builder()
          .secretToken(itemConfigRequest.getSecretToken())
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
      proxyConfigRepository.save(
          nginxConfigRequest.getProxyPathList().get(i).toEntity(nginxConfig));
    }

  }

  @Transactional // 예외적 상황을 막기 위함
  public void deleteProject(long idx) {
    Project project = projectRepository.findByIdx(idx)
        .orElseThrow(() -> new ProjectNotFoundException(GlobalErrorCode.PROJECT_NOT_FOUND));
    project.updateDeletedFlag();
  }


}
