package org.a402.deployz.domain.item.entity;

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
@Table(name = "deploy")
public class Deploy {
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
	@JoinColumn(name = "item_idx")
	private Item item;

	@Builder
	public Deploy(final Long idx, final String status, final LocalDateTime registerTime,
		final LocalDateTime lastUpdatedDate, final Item item) {
		this.idx = idx;
		this.status = status;
		this.registerTime = registerTime;
		this.lastUpdatedDate = lastUpdatedDate;
		this.item = item;
	}

	public void updateStatus(final String status) {
		this.status = status;
	}
}
