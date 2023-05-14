package org.a402.deployz.domain.deploy.common;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import org.a402.deployz.global.common.BaseResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileManager {

	public static final String REGEX = "/";

	public static void writeFile(final String preFilePath, final String fileName, final String fileContent) {
		StringBuilder sb = new StringBuilder();
		String filePath = sb.append(preFilePath).append(REGEX).append(fileName).toString();

		try (FileWriter fw = new FileWriter(new File(filePath))) {
			BufferedWriter writer = new BufferedWriter(fw);
			writer.write(fileContent);
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static String readFile(final String logPath, final String logName) {
		String str = null;
		StringBuilder sb = new StringBuilder();
		String FilePath = logPath + REGEX + logName;

		try (BufferedReader br = new BufferedReader(new FileReader(FilePath))) {
			while ((str = br.readLine()) != null) {
				sb.append(str);
			}
		} catch (FileNotFoundException f) {
			log.info(FilePath + " does not exist");
			return "Log File Read Fail";
		} catch (IOException e) {
			e.printStackTrace();
		}

		return sb.toString();
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
