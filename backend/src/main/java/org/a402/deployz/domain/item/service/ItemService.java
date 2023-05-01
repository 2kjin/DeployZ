package org.a402.deployz.domain.item.service;

import org.a402.deployz.domain.item.exception.ItemNotFoundException;
import org.a402.deployz.domain.item.repository.ItemRepository;
import org.a402.deployz.domain.project.exception.ProjectNotFoundException;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ItemService {
	private final ItemRepository itemRepository;
	public ItemService(ItemRepository itemRepository) {
		this.itemRepository = itemRepository;
	}

	@Transactional
	public void removeItem(long idx) {
		itemRepository.findItemByIdx(idx).orElseThrow(()-> new ItemNotFoundException(GlobalErrorCode.ITEM_NOT_FOUND)).updateDeletedFlag();
	}
}
