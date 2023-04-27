package org.a402.deployz.domain.project.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class ItemConfigRequest {

    @NotNull
    @Schema(description = "아이템 이름")
    private String itemName;

    @NotNull
    @Schema(description = "포트 번호1")
    private Integer portNumber1;

    @Schema(description = "포트 번호2")
    private Integer portNumber2;

    @NotNull
    @Schema(description = "브랜치 이름")
    private String branchName;

    @NotNull
    @Schema(description = "시크릿 토큰")
    private String secretToken;

    @NotNull
    @Schema(description = "타겟 폴더")
    private String targetFolder;

    @NotNull
    @Schema(description = "프레임워크 종류")
    private String frameworkType;

    @NotNull
    @Schema(description = "빌드 버전")
    private String buildVersion;

}
