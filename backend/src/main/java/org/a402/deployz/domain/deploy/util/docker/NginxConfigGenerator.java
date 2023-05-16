package org.a402.deployz.domain.deploy.util.docker;

import static org.a402.deployz.domain.project.entity.enums.FrameworkType.*;

import org.a402.deployz.domain.deploy.common.FileManager;
import org.a402.deployz.domain.item.entity.Item;
import org.a402.deployz.domain.project.request.NginxConfigRequest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class NginxConfigGenerator {

	public static void nginxConfigFile(final NginxConfigRequest nginxConfigRequest, final Long portNumber) {
		StringBuilder sb = new StringBuilder();
		sb.append("server {\n")
			.append("\tserver_name ").append(nginxConfigRequest.getDomainUrl()).append(";\n\n")
			.append("\tlisten 443 ssl;\n")
			.append("\tssl_certificate ").append(nginxConfigRequest.getSslCertificate()).append(";\n")
			.append("\tssl_certificate_key ").append(nginxConfigRequest.getSslCertificateKey()).append(";\n\n")
			.append("\tlocation / {\n")
			.append("\t\tproxy_pass http://localhost:").append(portNumber).append(";\n")
			.append("\t\tproxy_set_header Host $http_host;\n")
			.append("\t\tproxy_set_header X-Real-IP $remote_addr;\n")
			.append("\t\tproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n")
			.append("\t\tproxy_set_header X-Forwarded-Proto $scheme;\n").append("\t}\n").append("}\n")
			.append("server {\n")
			.append("\treturn 301 https://$host$request_uri;\n")
			.append("\tlisten 80;\n")
			.append("\tserver_name ").append(nginxConfigRequest.getDomainUrl()).append(";\n\n")
			.append("\treturn 404;\n").append("}");
		log.info("default.conf: {}", sb.toString());
		FileManager.writeFile("/etc/nginx/sites-available", "default", sb.toString());
	}

}
