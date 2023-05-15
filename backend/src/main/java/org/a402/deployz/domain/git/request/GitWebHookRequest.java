package org.a402.deployz.domain.git.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GitWebHookRequest {
	private String branchName;
	private String account;
	private String projectId;

	@Builder
	public GitWebHookRequest(final String branchName, final String account, final String projectId) {
		this.branchName = branchName;
		this.account = account;
		this.projectId = projectId;
	}
}
