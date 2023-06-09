package org.a402.deployz.domain.project.repository;

import java.util.Optional;

import org.a402.deployz.domain.git.entity.GitConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GitConfigRepository extends JpaRepository<GitConfig, Long> {
	Optional<GitConfig> findGitConfigByProjectIdAndDeletedFlagIsFalse(final int projectId);
	Boolean existsByProjectIdAndDeletedFlagIsFalse(final int projectId);
}
