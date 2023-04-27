package org.a402.deployz.domain.project.request;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.a402.deployz.domain.git.entity.GitConfig;
import org.a402.deployz.domain.project.entity.Project;

@Getter
@AllArgsConstructor
public class GitConfigRequest {

  @NotNull
  @Schema(description = "호스트 url 주소")
  private String hostUrl;

  @NotNull
  @Schema(description = "레포지토리 url 주소")
  private String repositoryUrl;

  @NotNull
  @Schema(description = "프로젝트 아이디")
  private Integer projectId;

  @NotNull
  @Schema(description = "깃 어세스 토큰")
  private String accessToken;

  public GitConfig toEntity(Project project) {
    return GitConfig.builder()
        .hostUrl(hostUrl)
        .repositoryUrl(repositoryUrl)
        .projectId(projectId)
        .gitAccessToken(accessToken)
        .project(project)
        .build();
  }

}
