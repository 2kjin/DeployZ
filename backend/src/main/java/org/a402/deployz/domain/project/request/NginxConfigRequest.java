package org.a402.deployz.domain.project.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

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

}
