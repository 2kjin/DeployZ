package org.a402.deployz.domain.project.repository;

import org.a402.deployz.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface  ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findByIdx(long idx);
}
