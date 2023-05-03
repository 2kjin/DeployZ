package org.a402.deployz.domain.project.repository;

import java.util.List;
import java.util.Optional;

import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.response.ProjectResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	Optional<Project> findByIdx(long projectIdx);

	Optional<Project> findProjectByIdx(long projectIdx);
	List<Project> findByMemberIdx(long idx);


}
