package org.a402.deployz.domain.item.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "item_state")
public class ItemState {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idx", nullable = false)
	private Long idx;
	@Column(name = "register_date")
	private LocalDateTime registerDate;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_idx")
	private Item item;
	@OneToMany(mappedBy = "itemState", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private List<Build> builds;
	@OneToMany(mappedBy = "itemState", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private List<Build> runs;
	@OneToMany(mappedBy = "itemState", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	private List<Build> deploys;

	@Builder
	public ItemState(final Long idx, final LocalDateTime registerDate, final Item item, final List<Build> builds,
		final List<Build> runs,
		final List<Build> deploys) {
		this.idx = idx;
		this.registerDate = registerDate;
		this.item = item;
		this.builds = builds;
		this.runs = runs;
		this.deploys = deploys;
	}

}
