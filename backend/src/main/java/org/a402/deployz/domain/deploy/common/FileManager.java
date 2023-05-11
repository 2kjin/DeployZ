package org.a402.deployz.domain.deploy.common;

import java.io.File;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileManager {
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
