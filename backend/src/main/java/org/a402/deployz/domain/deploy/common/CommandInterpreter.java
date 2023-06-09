package org.a402.deployz.domain.deploy.common;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommandInterpreter {
	public static final char NEW_LINE = '\n';

	public static void run(final String logPath, final String logName, final String command) {
		log.info("command run Start : logPath = {} , logName = {}", logPath, logName);

		final String logFilePath = logPath + '/' + logName;

		final File file = new File(logFilePath);

		final DefaultExecutor executor = new DefaultExecutor();

		try (final FileOutputStream fileOutputStream = new FileOutputStream(file)) {
			final CommandLine commandLine = CommandLine.parse(command);
			final PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(fileOutputStream);

			fileOutputStream.write(command.getBytes());
			fileOutputStream.write(NEW_LINE);

			executor.setStreamHandler(pumpStreamHandler);
			executor.setExitValues(new int[] {0});

			executor.execute(commandLine);
			fileOutputStream.flush();

			log.info("run Success");
		} catch (IOException ioException) {
			log.info("run Failure");
			throw new RuntimeException(ioException);
		}

		log.info("run Done");
	}

	public static void runDestinationPath(final String projectPath, final String itemPath, final String logPath,
		final String logName, final String command) {
		log.info("runPath Start : projectPath = {} , logPath = {} , logName = {}", projectPath, logPath, logName);

		final String logFilePath = logPath + '/' + logName;

		FileManager.checkAndCreateDirectory(projectPath);
		FileManager.checkAndCreateDirectory(itemPath);
		FileManager.checkAndCreateDirectory(logPath);

		final File file = new File(logFilePath);
		final File destinationFile = new File(itemPath);

		final DefaultExecutor executor = new DefaultExecutor();

		try (final FileOutputStream fileOutputStream = new FileOutputStream(file)) {
			final CommandLine commandLine = CommandLine.parse(command);
			final PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(fileOutputStream);

			fileOutputStream.write(command.getBytes());
			fileOutputStream.write(NEW_LINE);

			executor.setWorkingDirectory(destinationFile);
			executor.setStreamHandler(pumpStreamHandler);
			executor.setExitValues(new int[] {0});  // 1 == error 하지만 network_bridge already 1

			executor.execute(commandLine);
			fileOutputStream.flush();

			log.info("runPath Success");
		} catch (IOException ioException) {
			log.info("runPath Failure");
			throw new RuntimeException(ioException);
		}

		log.info("runPath Done");
	}

	public static void runDestinationPath(final String repositoryPath, final String logPath, final String logName,
		final String command) {
		log.info("runPath Start : repositoryPath = {} , logPath = {} , logName = {}", repositoryPath, logPath, logName);

		final String logFilePath = logPath + '/' + logName;

		FileManager.checkAndCreateDirectory(repositoryPath);
		FileManager.checkAndCreateDirectory(logPath);

		final File file = new File(logFilePath);
		final File destinationFile = new File(repositoryPath);

		final DefaultExecutor executor = new DefaultExecutor();

		try (final FileOutputStream fileOutputStream = new FileOutputStream(file)) {
			final CommandLine commandLine = CommandLine.parse(command);
			final PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(fileOutputStream);

			fileOutputStream.write(command.getBytes());
			fileOutputStream.write(NEW_LINE);

			executor.setWorkingDirectory(destinationFile);
			executor.setStreamHandler(pumpStreamHandler);
			executor.setExitValues(new int[] {0});  // 1 == error 하지만 network_bridge already 1

			executor.execute(commandLine);
			fileOutputStream.flush();

			log.info("runPath Success");
		} catch (IOException ioException) {
			log.info("runPath Failure");
			throw new RuntimeException(ioException);
		}

		log.info("runPath Done");
	}

}
