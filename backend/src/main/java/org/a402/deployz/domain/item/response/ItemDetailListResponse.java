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
	private String buildStep;
	@NotNull
	private String itemName;
	@NotNull
	private String frameworkType;

	private String consol;
	private LocalDateTime lastSuccessDate;
	private LocalDateTime lastFailureDate;
	private List<BuildHistory> buildHistoryList;

	public ItemDetailListResponse(Long itemIdx, Long portNumber, String buildStep, String itemName, String frameworkType, String consol, LocalDateTime lastSuccessDate, LocalDateTime lastFailureDate,  List<BuildHistory> buildHistoryList){
		this.itemIdx=itemIdx;
		this.portNumber=portNumber;
		this.buildStep=buildStep;
		this.itemName=itemName;
		this.frameworkType=frameworkType;
		this.consol=consol;
		this.lastSuccessDate=lastSuccessDate;
		this.lastFailureDate=lastFailureDate;
		this.buildHistoryList=buildHistoryList;
	}
}
