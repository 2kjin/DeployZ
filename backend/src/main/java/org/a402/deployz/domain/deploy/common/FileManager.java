package org.a402.deployz.domain.deploy.common;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileManager {

	public static final String REGEX = "/";

	public static void writeFile(final String preFilePath, final String fileName, final String fileContent) {
		StringBuilder sb = new StringBuilder();
		String filePath = sb.append(preFilePath).append(REGEX).append(fileName).toString();
		checkAndCreateDirectory(filePath);

		try (FileWriter fw = new FileWriter(new File(filePath))) {
			BufferedWriter writer = new BufferedWriter(fw);
			writer.write(fileContent);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void checkAndCreateDirectory(final String filePath) {
		log.info("checkAndMakeDirectory Start : filePath = {}", filePath);

		final boolean isFileExisted = !new File(filePath).exists();

		if (isFileExisted) {
			final boolean isCreateFile = new File(filePath).mkdirs();

			if (isCreateFile) {
				log.info("checkAndMakeDir : direction created : {}", filePath);
			}
		}

		log.info("checkAndMakeDirectory Done : filePath = {}", filePath);
	}
}
