package org.a402.deployz.domain.project.service;

import lombok.RequiredArgsConstructor;
import org.a402.deployz.domain.project.request.TotalProjectConfigRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//  | findOrder() | 조회 유형의 service 메서드 |
//  | addOrder() | 등록 유형의 service 메서드 |
//  | modifyOrder() | 변경 유형의 service 메서드 |
//  | removeOrder() | 삭제 유형의 service 메서드 |
//  | saveOrder() | 등록/수정/삭제 가 동시에 일어나는 유형의 service 메서드 |
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

    @Transactional
    public void addProject(TotalProjectConfigRequest request) {

        // Project 엔티티
        // NginxConfig 엔티티
        // GitConfig 엔티티
        // ItemConfig 엔티티
        // ProxyPath 엔티티

    }

}
