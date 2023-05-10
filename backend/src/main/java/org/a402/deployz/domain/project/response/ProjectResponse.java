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
	private Long itemCnt;
	private HashMap<String, Integer>branches;


	public ProjectResponse (Project project, String status, Long itemCnt, HashMap<String, Integer> branches) {
		this.idx = project.getIdx();
		this.memberIdx= project.getMember().getIdx();
		this.projectName=project.getProjectName();
		this.lastSuccessDate=project.getLastSuccessDate();
		this.lastFailureDate=project.getLastFailureDate();
		this.status=status;
		this.itemCnt=itemCnt;
		this.branches=branches;
		this.description=project.getDescription();
	}

}