package org.a402.deployz.domain.project.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class ProxyPathRequest {

    @NotNull
    @Schema(description = "경로 주소")
    private String pathUrl;

    @NotNull
    @Schema(description = "경로 이름")
    private String pathName;

}
