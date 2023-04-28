package org.a402.deployz.domain.project.request;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TotalProjectConfigRequest {

    @NotNull
    @Schema(description = "프로젝트 설정 정보")
    private ProjectConfigRequest projectConfig;

    @NotNull
    @Schema(description = "아이템 설정 목록")
    private List<ItemConfigRequest> itemList;

    @NotNull
    @Schema(description = "깃 설정 정보")
    private GitConfigRequest gitConfig;

    @NotNull
    @Schema(description = "Nginx 설정 정보")
    private NginxConfigRequest nginxConfig;

}