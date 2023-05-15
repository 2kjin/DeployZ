package org.a402.deployz.domain.item.repository;

import java.util.Optional;

import org.a402.deployz.domain.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
	Optional<Item> findItemByBranchName(final String branchName);
	boolean existsByPortNumber(Long port);
	Optional<Item>findItemByIdx(Long itemIdx);
	long countItemsByProjectIdx(Long projectIdx);
}
