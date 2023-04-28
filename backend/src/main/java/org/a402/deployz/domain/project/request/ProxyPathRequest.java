package org.a402.deployz.domain.project.request;

import javax.validation.constraints.NotNull;

import org.a402.deployz.domain.project.entity.NginxConfig;
import org.a402.deployz.domain.project.entity.ProxyConfig;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProxyPathRequest {

	@NotNull
	@Schema(description = "프록시 임시 번호")
	private Integer idx;

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
