package org.a402.deployz.domain.project.repository;

import org.a402.deployz.domain.git.entity.GitToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GitTokenRepository extends JpaRepository<GitToken, Long> {

}
