package org.a402.deployz.domain.git.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a402.deployz.domain.project.entity.Project;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "git_config")
public class GitConfig {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idx", nullable = false)
	private Long idx;
	@Column(name = "host_url", length = 50)
	private String hostUrl;
	@Column(name = "repository_url", length = 50)
	private String repositoryUrl;
	@Column(name = "git_access_token", length = 50)
	private String gitAccessToken;
	@Column(name = "project_id", nullable = false)
	private int projectId;
	@OneToOne
	@JoinColumn(name = "project_idx")
	private Project project;
	@OneToMany(mappedBy = "gitConfig", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private List<GitToken> gitTokens = new ArrayList<>();
	@OneToMany(mappedBy = "gitConfig", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private List<GitHistory> gitHistories = new ArrayList<>();

	@Builder
	public GitConfig(final Long idx, final String hostUrl, final String repositoryUrl,
					 final String gitAccessToken, final int projectId, final Project project,
					 final List<GitToken> gitTokens, final List<GitHistory> gitHistories) {
		this.idx = idx;
		this.hostUrl = hostUrl;
		this.repositoryUrl = repositoryUrl;
		this.gitAccessToken = gitAccessToken;
		this.projectId = projectId;
		this.project = project;
		this.gitTokens = gitTokens;
		this.gitHistories = gitHistories;
	}

}
