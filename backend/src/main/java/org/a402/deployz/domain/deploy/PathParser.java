package org.a402.deployz.domain.deploy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PathParser {
	public static final String SEPERATOR = "/";
	@Value("${deployz.rootPath}")
	private String root;

	@Value("${deployz.logPath}")
	private String log;

	@Value("${deployz.configPath}")
	private String config;

	public StringBuilder getRootPath() {
		final StringBuilder stringBuilder = new StringBuilder();

		return stringBuilder.append(root);
	}

	public StringBuilder getProjectPath(final String projectName) {
		return getRootPath().append(SEPERATOR).append(projectName);
	}

	public StringBuilder getLogPath(final String projectName) {
		return getProjectPath(projectName).append(SEPERATOR).append(log);
	}

	public StringBuilder getRepositoryPath(final String projectName, final Long projectId) {
		return getProjectPath(projectName).append(SEPERATOR).append(projectId);
	}
}
