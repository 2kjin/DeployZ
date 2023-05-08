package org.a402.deployz.domain.item.response;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

import lombok.Getter;

@Getter
public class ItemBuildHistoryResponse {
	@NotNull
	private Long idx;
	@NotNull
	private String status;
	@NotNull
	private String consol;
	@NotNull
	private LocalDateTime registerDate;
	public ItemBuildHistoryResponse(Long idx, String status, String consol, LocalDateTime registerDate){
		this.idx= idx;
		this.status=status;
		this.consol=consol;
		this.registerDate=registerDate;
	}
}
