package org.a402.deployz.domain.git.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GitWebHookRequest {
	private String eventType;
	private String username;
	private String gitHttpUrl;
	private String branchName;
	private String repositoryName;

	@Builder
	public GitWebHookRequest(final String eventType, final String username, final String gitHttpUrl,
		final String branchName,
		final String repositoryName) {
		this.eventType = eventType;
		this.username = username;
		this.gitHttpUrl = gitHttpUrl;
		this.branchName = branchName;
		this.repositoryName = repositoryName;
	}

}
