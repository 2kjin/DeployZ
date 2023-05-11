package org.a402.deployz.domain.deploy.repository;

import java.util.Optional;

import org.a402.deployz.domain.item.entity.BuildHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildHistoryRepository extends JpaRepository<BuildHistory, Long> {
	Optional<BuildHistory> findBuildHistoryByItemIdx(long itemIdx);
}