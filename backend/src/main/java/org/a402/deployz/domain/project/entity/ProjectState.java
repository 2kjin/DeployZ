package org.a402.deployz.domain.project.entity;

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
@Table(name = "project_state")
public class ProjectState {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idx", nullable = false)
	private Long idx;
	@Column(name = "status")
	private String status;
	@Column(name = "register_Time")
	private LocalDateTime registerTime;
	@Column(name = "last_failure_date")
	private LocalDateTime lastFailureDate;
	@Column(name = "step", length = 20)
	private String step;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_idx")
	private Project project;

	@Builder
	public ProjectState(final Long idx, final String status, final LocalDateTime registerTime,
		final LocalDateTime lastFailureDate, final String step, final Project project) {
		this.idx = idx;
		this.status = status;
		this.registerTime = registerTime;
		this.lastFailureDate = lastFailureDate;
		this.step = step;
		this.project = project;
	}

}
