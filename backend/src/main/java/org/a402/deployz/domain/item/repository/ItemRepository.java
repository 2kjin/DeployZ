package org.a402.deployz.domain.item.repository;

import java.util.Optional;

import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

	boolean existsByPortNumber1(Long port1);
	boolean existsByPortNumber2(Long port2);
	Optional<Item>findItemByIdx(long idx);
}
