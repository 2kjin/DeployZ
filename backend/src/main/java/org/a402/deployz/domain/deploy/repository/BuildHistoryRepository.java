package org.a402.deployz.domain.deploy.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.a402.deployz.domain.item.entity.BuildHistory;
import org.a402.deployz.domain.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildHistoryRepository extends JpaRepository<BuildHistory, Long> {
	List<BuildHistory> findBuildHistoryByItemIdxAndDeletedFlagIsFalse(final long itemIdx);
	List<BuildHistory> findBuildHistoryByItemAndDeletedFlagIsFalseOrderByRegisterTime(final Item item);

	@Query(value = "select a.registerTime\n"
		+ "from BuildHistory a \n"
		+ "\tjoin Item b on a.item.idx=b.idx\n"
		+ "where a.status='SUCCESS' and  b.project.idx= :projectIdx \n"
		+ "order by a.registerTime DESC\n")
	List<LocalDateTime> lastSuccessDate ( Long projectIdx);

	@Query(value = "select a.registerTime\n"
		+ "from BuildHistory a \n"
		+ "\tjoin Item b on a.item.idx=b.idx\n"
		+ "where a.status='FAIL' and  b.project.idx= :projectIdx \n"
		+ "order by a.registerTime DESC\n")
	List<LocalDateTime> lastFailureDate (Long projectIdx);

	@Query(value = "select a.status\n"
		+ "from BuildHistory a \n"
		+ "\tjoin Item b on a.item.idx=b.idx\n"
		+ "where b.project.idx= :projectIdx \n"
		+ "order by a.registerTime DESC\n")
	List<String> lastStatue( Long projectIdx);
}