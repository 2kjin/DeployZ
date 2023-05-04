package org.a402.deployz.domain.project.repository;

import java.util.List;
import java.util.Optional;

import org.a402.deployz.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	Optional<Project> findProjectByIdx(long projectIdx);
	List<Project> findByMemberIdx(long idx);

}
