package org.a402.deployz.domain.item.response;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.a402.deployz.domain.item.entity.BuildHistory;

import lombok.Getter;

@Getter
public class ItemDetailListResponse {
	@NotNull
	private Long itemIdx;
	@NotNull
	private Long portNumber;
	@NotNull
	private String itemName;
	@NotNull
	private String frameworkType;

	private String status;
	private LocalDateTime lastSuccessDate;
	private LocalDateTime lastFailureDate;
	private List<ItemBuildHistoryResponse> buildHistories;

	public ItemDetailListResponse(List<ItemBuildHistoryResponse> buildHistories, ItemListResponse itemInfo) {
		this.buildHistories=buildHistories;
		this.itemIdx=itemInfo.getIdx();
		this.itemName=itemInfo.getName();
		this.status=itemInfo.getStatus();
		this.frameworkType= itemInfo.getFramworkType();
		this.lastSuccessDate=itemInfo.getLastSuccessDate();
		this.lastFailureDate=itemInfo.getLastFailureDate();
		this.portNumber=itemInfo.getPortNumber();
	}
}
