package org.a402.deployz.domain.item.repository;

import java.util.Optional;

import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
	Optional<Item> findItemByProjectAndBranchNameAndDeletedFlagIsFalse(final Project project, final String branchName);

	boolean existsByPortNumberAndDeletedFlagIsFalse(final Long port);

	Optional<Item> findItemByIdxAndDeletedFlagIsFalse(final Long itemIdx);

}
