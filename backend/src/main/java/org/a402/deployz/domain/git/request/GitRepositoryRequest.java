package org.a402.deployz.domain.git.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GitRepositoryRequest {
	private String name;
	private String url;
	private String description;
	private String homepage;
	private String git_http_url;
	private String git_ssh_url;
	private String visibility_level;
}
