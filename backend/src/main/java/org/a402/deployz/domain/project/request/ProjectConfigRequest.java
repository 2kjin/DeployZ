package org.a402.deployz.domain.project.request;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.a402.deployz.domain.project.entity.Project;

@Getter
@AllArgsConstructor
public class ProjectConfigRequest {

  @NotNull
  @Schema(description = "프로젝트 이름")
  private String projectName;
  @NotNull
  @Schema(description = "프로젝트 설명")
  private String description;
  @Schema(description = "프로젝트 사진")
  private String imageUrl;

  public Project toEntity(ProjectConfigRequest projectConfig) {
    return Project.builder()
        .projectName(projectConfig.getProjectName())
        .description(projectConfig.getDescription())
        .imagePath(projectConfig.getImageUrl())
        .build();
  }
}
