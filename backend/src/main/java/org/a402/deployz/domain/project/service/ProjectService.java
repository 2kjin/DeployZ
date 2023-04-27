package org.a402.deployz.domain.project.service;

import lombok.RequiredArgsConstructor;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.exception.ProjectNotFoundException;
import org.a402.deployz.domain.project.repository.ProjectRepository;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.springframework.stereotype.Service;
import org.a402.deployz.domain.project.exception.ProjectNotFoundException;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    @Transactional // 예외적 상황을 막기 위함
    public void deleteProject(long idx) {
            Project project = projectRepository.findByIdx(idx).orElseThrow(() -> new ProjectNotFoundException(GlobalErrorCode.PROJECT_NOT_FOUND));
            project.updateDeletedFlag();
    }
}
