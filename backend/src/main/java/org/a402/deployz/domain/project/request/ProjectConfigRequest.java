package org.a402.deployz.domain.project.request;

import javax.validation.constraints.NotNull;

import org.a402.deployz.domain.git.entity.GitConfig;
import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.project.entity.Project;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

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

	@NotNull
	@Schema(description = "호스트 url 주소")
	private String hostUrl;

	@NotNull
	@Schema(description = "레포지토리 url 주소")
	private String repositoryUrl;

	@NotNull
	@Schema(description = "프로젝트 아이디")
	private Integer projectId;

	public Project toEntity(Member member) {
		return Project.builder()
			.projectName(projectName)
			.description(description)
			.imagePath(imageUrl)
			.member(member)
			.build();
	}

	public GitConfig toGEntity(Project project) {
		return GitConfig.builder()
			.hostUrl(hostUrl)
			.repositoryUrl(repositoryUrl)
			.projectId(projectId)
			.project(project)
			.build();
	}
}
