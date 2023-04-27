package org.a402.deployz.domain.project.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class GitConfigRequest {

    @NotNull
    @Schema(description = "호스트 url 주소")
    private String hostUrl;

    @NotNull
    @Schema(description = "레포지토리 url 주소")
    private String repositoryUrl;

    @NotNull
    @Schema(description = "프로젝트 아이디")
    private Integer projectId;

    @NotNull
    @Schema(description = "깃 어세스 토큰")
    private String accessToken;

}
