package org.a402.deployz.domain.project.repository;

import org.a402.deployz.domain.project.entity.ProxyConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProxyConfigRepository extends JpaRepository<ProxyConfig, Long> {

}
