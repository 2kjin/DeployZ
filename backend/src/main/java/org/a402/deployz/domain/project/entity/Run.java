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

import org.a402.deployz.domain.project.entity.ItemState;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "run")
public class Run {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idx", nullable = false)
	private Long idx;
	@Column(name = "status")
	private String status;
	@Column(name = "register_Time")
	private LocalDateTime registerTime;
	@Column(name = "last_modified_date")
	private LocalDateTime lastUpdatedDate;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_state_idx")
	private ItemState itemState;

	@Builder
	public Run(final Long idx, final String status, final LocalDateTime registerTime,
		final LocalDateTime lastUpdatedDate, final ItemState itemState) {
		this.idx = idx;
		this.status = status;
		this.registerTime = registerTime;
		this.lastUpdatedDate = lastUpdatedDate;
		this.itemState = itemState;
	}

}
