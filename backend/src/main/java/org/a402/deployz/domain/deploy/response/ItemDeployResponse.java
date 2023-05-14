package org.a402.deployz.domain.deploy.response;

import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ItemDeployResponse {
	@NotNull
	private final String status;
	@NotNull
	private final String message;

	public ItemDeployResponse(String status, String message) {
		this.status = status;
		this.message = message;
	}

}
