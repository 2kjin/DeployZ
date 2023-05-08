package org.a402.deployz.domain.deploy;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.a402.deployz.domain.git.entity.GitConfig;
import org.a402.deployz.domain.git.entity.GitToken;

public class GitAdapter {
	public static final String REGEX = "/";

	public static String getCloneCommand(final GitToken gitToken) {
		StringBuilder stringBuilder = writeGitCloneCommand(gitToken);

		return stringBuilder.toString();
	}

	private static StringBuilder writeGitCloneCommand(final GitToken gitToken) {
		final GitConfig gitConfig = gitToken.getGitConfig();
		final List<String> splitUrlUnits = parseUrl(gitConfig.getRepositoryUrl());
		final StringBuilder stringBuilder = new StringBuilder();

		if (splitUrlUnits.size() > 4) {
			throw new UrlInvalidFormatException();
		}

		return stringBuilder.append("git clone -b ").append(gitToken.getBranchName())
			.append(" --single-branch ")
			.append(splitUrlUnits.get(0)).append(splitUrlUnits.get(2)) // protocol, username
			.append(":").append(gitConfig.getGitAccessToken())
			.append("@").append(splitUrlUnits.get(1)).append(splitUrlUnits.get(2)) // hosturl, username
			.append(splitUrlUnits.get(3)); // branch 이름
	}

	public static List<String> parseUrl(final String url) {
		final List<String> parseUrl = new ArrayList<>();

		parseUrl.add(url.substring(0, 8));
		Collections.addAll(parseUrl, url.substring(8).split(REGEX));

		return parseUrl;
	}
}
