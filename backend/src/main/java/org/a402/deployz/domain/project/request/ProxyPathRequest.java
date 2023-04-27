package org.a402.deployz.domain.project.request;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.a402.deployz.domain.project.entity.NginxConfig;
import org.a402.deployz.domain.project.entity.ProxyConfig;

@Getter
@AllArgsConstructor
public class ProxyPathRequest {

  @NotNull
  @Schema(description = "경로 주소")
  private String pathUrl;

  @NotNull
  @Schema(description = "경로 이름")
  private String pathName;

  public ProxyConfig toEntity(NginxConfig nginxConfig) {
    return ProxyConfig.builder()
        .pathUrl(pathUrl)
        .pathName(pathName)
        .nginxConfig(nginxConfig)
        .build();
  }
}
