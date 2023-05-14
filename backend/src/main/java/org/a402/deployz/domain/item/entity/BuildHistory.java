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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@DynamicUpdate
@Table(name = "build_history")
public class BuildHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idx", nullable = false)
	private Long idx;
	@Column(name = "status", length = 20)
	private String status;
	@Column(name = "message", columnDefinition = "LONGTEXT")
	private String message;
	@CreationTimestamp
	@Column(name = "register_Time")
	private LocalDateTime registerTime = LocalDateTime.now();
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_idx")
	private Item item;

	public void updateStatus(final String status, final String message) {
		this.status = status;
		this.message = message;
		this.registerTime = LocalDateTime.now();
	}

	@Builder
	public BuildHistory(final Long idx, final String status, final String message, final LocalDateTime registerTime,
		final Item item) {
		this.idx = idx;
		this.status = status;
		this.message = message;
		this.registerTime = registerTime;
		this.item = item;
	}

}
