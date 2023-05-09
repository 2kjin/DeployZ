package org.a402.deployz.domain.item.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BuildItemRequest {
	private final Long projectIdx;
	private final Long itemIdx;
}
