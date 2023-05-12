package org.a402.deployz.domain.git.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GitWebHookRequest {
	private String eventType;
	private String gitHttpUrl;
	private String repositoryName;
	private String projectId;
	private String branchName;

	@Builder
	public GitWebHookRequest(final String eventType, final String gitHttpUrl, final String repositoryName,
		final String projectId, final String branchName) {
		this.eventType = eventType;
		this.gitHttpUrl = gitHttpUrl;
		this.repositoryName = repositoryName;
		this.projectId = projectId;
		this.branchName = branchName;
	}
}
