package org.a402.deployz.domain.git.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GitWebHookRequest {
	private Long itemIdx;
	private String account;

	@Builder
	public GitWebHookRequest(final Long itemIdx, final String account) {
		this.itemIdx = itemIdx;
		this.account = account;
	}
}
