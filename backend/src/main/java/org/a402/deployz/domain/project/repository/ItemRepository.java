package org.a402.deployz.domain.project.repository;

import org.a402.deployz.domain.project.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
	boolean existsByPortNumber1(Long port1);

	boolean existsByPortNumber2(Long port2);

}
