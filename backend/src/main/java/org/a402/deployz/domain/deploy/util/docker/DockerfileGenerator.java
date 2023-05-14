package org.a402.deployz.domain.deploy.util.docker;

import static org.a402.deployz.domain.project.entity.enums.FrameworkType.*;
import static org.a402.deployz.domain.project.entity.enums.ReactVersion.*;
import static org.a402.deployz.domain.project.entity.enums.SpringBootVersion.*;

import org.a402.deployz.domain.deploy.common.FileManager;
import org.a402.deployz.domain.item.entity.Item;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DockerfileGenerator {

	public static final String REGEX = "/";

	public static void checkDockerfileType(final Item item, final String repositoryPath) {
		StringBuilder sb = new StringBuilder();
		String targetFolderPath = item.getTargetFolderPath();
		if (targetFolderPath.charAt(0) != '/') {
			sb.append(REGEX).append(targetFolderPath);
		} else {
			sb.append(targetFolderPath);
		}
		String type = item.getFrameworkType();
		if (type.equals(SPRINGBOOT.getName())) {
			springBootDockerfile(item, sb.toString(), repositoryPath);
		} else if (type.equals(REACT.getName())) {

		}
	}

	private static void springBootDockerfile(final Item item, final String targetFolderPath,
		final String DockerfilePath) {
		StringBuilder sb = new StringBuilder();
		if (item.getBuildVersion().charAt(0) == 'g') {
			// Gradle
			sb.append("FROM ").append("openjdk:").append(item.getJavaVersion()).append("-jdk")
				.append(" as builder\n").append("COPY .").append(targetFolderPath).append(" .\n")
				.append("RUN chmod +x ./gradlew\n").append("RUN ./gradlew clean build\n")
				.append("FROM ").append(item.getBuildVersion()).append("-jdk").append(item.getJavaVersion())
				.append("\nCOPY --from=builder /build/libs/*.jar /app.jar\n")
				.append("ENTRYPOINT [\"java\", \"-jar\", \"-Duser.timezone=Asia/Seoul\", \"/app.jar\"]");
		} else {
			// Maven
			sb.append("FROM ").append("openjdk:").append(item.getJavaVersion()).append("-jdk")
				.append(" as builder\n").append("COPY .").append(targetFolderPath).append(" .\n")
				.append("RUN chmod +x ./mvnw\n").append("RUN ./mvnw clean package\n")
				.append("FROM ").append(item.getBuildVersion()).append("-jdk").append(item.getJavaVersion())
				.append("\nCOPY --from=builder /target/*.jar /app.jar\n")
				.append("ENTRYPOINT [\"java\", \"-jar\", \"-Duser.timezone=Asia/Seoul\", \"/app.jar\"]");
		}
		log.info(sb.toString());
		FileManager.writeFile(DockerfilePath, "Dockerfile", sb.toString());
	}

}
