package org.a402.deployz.domain.git.entity;

import java.time.LocalDateTime;

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
@Table(name = "git_history")
public class GitHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idx", nullable = false)
	private Long idx;
	@Column(name = "message", length = 100)
	private String message;
	@Column(name = "event_date")
	private LocalDateTime eventDate;
	@Column(name = "branch_name", length = 50)
	private String branchName;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "git_config_idx")
	private GitConfig gitConfig;

	@Builder
	public GitHistory(final Long idx, final String message, final LocalDateTime eventDate, final String branchName,
		final GitConfig gitConfig) {
		this.idx = idx;
		this.message = message;
		this.eventDate = eventDate;
		this.branchName = branchName;
		this.gitConfig = gitConfig;
	}

}
