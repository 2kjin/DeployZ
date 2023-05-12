package org.a402.deployz.domain.git.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GitProjectRequest {
	private String id;
	private String name;
	private String description;
	private String web_url;
	private String git_http_url;
	private String avatar_url;
	private String ci_config_path;
	private String git_ssh_url;
	private String namespace;
	private String visibility_level;
	private String path_with_namespace;
	private String default_branch;
	private String homepage;
	private String url;
	private String ssh_url;
	private String http_url;
}
