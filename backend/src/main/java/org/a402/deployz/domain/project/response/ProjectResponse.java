package org.a402.deployz.domain.project.response;

import java.time.LocalDateTime;
import java.util.HashMap;

import javax.validation.constraints.NotNull;

import org.a402.deployz.domain.project.entity.Project;

import lombok.Getter;

@Getter
public class ProjectResponse {

	@NotNull
	private Long idx;
	@NotNull
	private Long memberIdx;
	@NotNull
	private String description;
	@NotNull
	private String projectName;

	private LocalDateTime lastSuccessDate;
	private LocalDateTime lastFailureDate;
	private String status;
	private HashMap<String, Integer>branches;


	public ProjectResponse (Project project, String status, HashMap<String, Integer> branches, LocalDateTime lastSuccessDate, LocalDateTime lastFailureDate) {
		this.idx = project.getIdx();
		this.projectName=project.getProjectName();
		this.lastSuccessDate = lastSuccessDate;
		this.lastFailureDate = lastFailureDate;
		this.status=status;
		this.branches=branches;
		this.description=project.getDescription();
	}

}