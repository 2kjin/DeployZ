package org.a402.deployz.domain.project.request;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.a402.deployz.domain.project.entity.NginxConfig;

@Getter
@AllArgsConstructor
public class NginxConfigRequest {

  @NotNull
  @Schema(description = "도메인 주소")
  private String domainUrl;

  @NotNull
  @Schema(description = "SSL 인증서 경로")
  private String sslCertificate;

  @NotNull
  @Schema(description = "SSL 비밀키 경로")
  private String sslCertificateKey;

  @NotNull
  @Schema(description = "프록시 경로 목록")
  private List<ProxyPathRequest> proxyPathList;

  public NginxConfig toEntity(NginxConfigRequest nginxConfig) {
    return NginxConfig.builder()
        .domain(nginxConfig.getDomainUrl())
        .sslCertificate(nginxConfig.getSslCertificate())
        .sslCertificateKey(nginxConfig.getSslCertificateKey())
        .build();
  }

}
