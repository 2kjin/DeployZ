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

	public StringBuilder getRepositoryPath(final String projectName, final String itemName,
		final String repositoryName) {
		return getProjectPath(projectName).append(SEPERATOR)
			.append(itemName)
			.append(SEPERATOR)
			.append(repositoryName);
	}

	public StringBuilder getItemPath(final String projectName, final String itemName) {
		return getProjectPath(projectName).append(SEPERATOR).append(itemName);
	}
}
