package org.a402.deployz.domain.deploy.util.docker;

import org.a402.deployz.domain.item.entity.Item;

public class DockerCommandGenerator {

	public static String build(final Item item, final String repositoryPath) {
		StringBuilder sb = new StringBuilder();
		sb.append("docker build -t ")
			.append(item.getName().toLowerCase())
			.append(":latest ")
			.append(repositoryPath);
		return sb.toString();
	}
}
