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

import org.a402.deployz.domain.item.entity.Item;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "build_history")
public class BuildHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idx", nullable = false)
	private Long idx;
	@Column(name = "status", length = 20)
	private Long status;
	@Column(name = "message", length = 100)
	private Long message;
	@Column(name = "register_Time")
	private LocalDateTime registerTime;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_idx")
	private Item item;

	@Builder
	public BuildHistory(final Long idx, final Long status, final Long message, final LocalDateTime registerTime,
		final Item item) {
		this.idx = idx;
		this.status = status;
		this.message = message;
		this.registerTime = registerTime;
		this.item = item;
	}

}
