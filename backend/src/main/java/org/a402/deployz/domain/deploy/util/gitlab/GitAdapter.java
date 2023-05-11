package org.a402.deployz.domain.deploy.util.gitlab;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.a402.deployz.domain.deploy.UrlInvalidFormatException;
import org.a402.deployz.domain.item.entity.Item;

public class GitAdapter {
	public static final String REGEX = "/";

	public static String getPullCommand(final String branchName) {
		return "git pull origin " + branchName;
	}

	public static String getCloneCommand(final Item item, final String personalAccessToken) {
		final List<String> splitUrlUnits = parseUrl(item.getProject().getGitConfig().getRepositoryUrl());
		final StringBuilder stringBuilder = new StringBuilder();

		if (splitUrlUnits.size() > 4) {
			throw new UrlInvalidFormatException();
		}

		return stringBuilder.append("git clone -b ").append(item.getBranchName())
			.append(" --single-branch ")
			.append(splitUrlUnits.get(0)).append(splitUrlUnits.get(2)) // protocol, user or group
			.append(":").append(personalAccessToken)
			.append("@").append(splitUrlUnits.get(1)).append("/").append(splitUrlUnits.get(2)) // host url, user or group
			.append("/").append(splitUrlUnits.get(3)).toString(); // branch
	}

	public static List<String> parseUrl(final String url) {
		final List<String> parseUrl = new ArrayList<>();

		parseUrl.add(url.substring(0, 8));
		Collections.addAll(parseUrl, url.substring(8).split(REGEX));

		return parseUrl;
	}
}
