package org.a402.deployz.domain.item.response;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

import org.a402.deployz.domain.item.entity.Item;

import lombok.Getter;

@Getter
public class ItemListResponse {
	@NotNull
	private Long idx;
	@NotNull
	private String name;
	@NotNull
	private Long portNumber1;
	@NotNull
	private Long portNumber2;
	@NotNull
	private LocalDateTime lastSuccessDate;
	@NotNull
	private LocalDateTime lastFailureDate;
	@NotNull
	private String status;

	public ItemListResponse(Item item, String status){
		this.idx=item.getIdx();
		this.name=item.getName();
		this.portNumber1=item.getPortNumber1();
		this.portNumber2=item.getPortNumber2();
		this.lastSuccessDate=item.getLastSuccessDate();
		this.lastFailureDate=item.getLastFailureDate();
		this.status=status;
	}
}
