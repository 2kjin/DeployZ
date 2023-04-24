package org.a402.deployz.domain.git.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "git_token")
public class GitToken {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idx", nullable = false)
	private Long idx;
	@Column(name = "branch_name", length = 50)
	private Long branchName;
	@Column(name = "secret_token", length = 100)
	private Long secretToken;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "git_config_idx")
	private GitConfig gitConfig;

	@Builder
	public GitToken(final Long idx, final Long branchName, final Long secretToken, final GitConfig gitConfig) {
		this.idx = idx;
		this.branchName = branchName;
		this.secretToken = secretToken;
		this.gitConfig = gitConfig;
	}

}
