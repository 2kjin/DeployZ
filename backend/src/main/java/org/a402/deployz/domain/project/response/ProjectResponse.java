package org.a402.deployz.domain.project.response;
import lombok.Getter;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.entity.ProjectState;

import java.time.LocalDateTime;
import javax.validation.constraints.NotNull;

@Getter
public class ProjectResponse {

	@NotNull
	private Long idx;
	@NotNull
	private Long memberIdx;
	@NotNull
	private String projectName;
	@NotNull
	private LocalDateTime lastSuccessDate;
	@NotNull
	private LocalDateTime lastFailureDate;
	@NotNull
	private String status;
	@NotNull
	private Long itemCnt;


	public ProjectResponse (Project project, String status, Long itemCnt) {
		this.idx = project.getIdx();
		this.memberIdx= project.getMember().getIdx();
		this.projectName=project.getProjectName();
		this.lastSuccessDate=project.getLastSuccessDate();
		this.lastFailureDate=project.getLastFailureDate();
		this.status=status;
		this.itemCnt=itemCnt;
	}

}