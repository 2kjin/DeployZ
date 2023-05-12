package org.a402.deployz.domain.git.service;

import java.util.Map;

import org.a402.deployz.domain.git.exception.NotSupportedEventTypeException;
import org.a402.deployz.domain.git.request.GitProjectRequest;
import org.a402.deployz.domain.git.request.GitRepositoryRequest;
import org.a402.deployz.domain.git.request.GitWebHookRequest;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class GitService {
	public static final String EVENT_NAME = "event_name";
	public static final String PUSH = "push";
	public static final String USER_USERNAME = "user_username";
	public static final String PROJECT = "project";
	public static final String REPOSITORY = "repository";
	public static final String MERGE_REQUEST = "merge_request";
	public static final String REPLACE_TARGET = "\"";
	public static final String REPLACE_REPLACEMENT = "";

	public GitWebHookRequest detectWebHook(final Map<String, Object> requestParams) {
		final GitWebHookRequest gitWebHookRequest = parseBuildData(requestParams);

		log.info("GitWebHookBranch: {}", gitWebHookRequest.getBranchName());
		log.info("GitWebHookHttpUrl: {}", gitWebHookRequest.getGitHttpUrl());
		log.info("GitWebHookUsername: {}", gitWebHookRequest.getUsername());
		log.info("GitWebHookEventType: {}", gitWebHookRequest.getEventType());
		log.info("GitWebHookRepositoryName: {}", gitWebHookRequest.getRepositoryName());

		return gitWebHookRequest;
	}

	public static GitWebHookRequest parseBuildData(final Map<String, Object> requestParams) {
		final ObjectMapper objectMapper = new ObjectMapper();

		try {
			final String eventName = removeExclamationMark(
				objectMapper.writeValueAsString(requestParams.get(EVENT_NAME)));
			log.info("webhook event type: {}", eventName);

			if (eventName.equals(PUSH)) {
				final String username = removeExclamationMark(
					objectMapper.writeValueAsString(requestParams.get(USER_USERNAME)));
				final String project = objectMapper.writeValueAsString(requestParams.get(PROJECT));
				final GitProjectRequest gitProjectRequest = objectMapper.readValue(project, GitProjectRequest.class);
				final String repository = objectMapper.writeValueAsString(requestParams.get(REPOSITORY));
				final GitRepositoryRequest gitRepositoryRequest = objectMapper.readValue(repository,
					GitRepositoryRequest.class);

				return GitWebHookRequest
					.builder()
					.username(username)
					.eventType(eventName)
					.branchName(gitProjectRequest.getDefault_branch())
					.repositoryName(gitRepositoryRequest.getName())
					.gitHttpUrl(gitProjectRequest.getGit_http_url())
					.build();

			} else if (eventName.equals(MERGE_REQUEST)) {
				final String username = removeExclamationMark(
					objectMapper.writeValueAsString(requestParams.get(USER_USERNAME)));
				final String project = objectMapper.writeValueAsString(requestParams.get(PROJECT));
				final GitProjectRequest gitProjectRequest = objectMapper.readValue(project, GitProjectRequest.class);
				final String repository = objectMapper.writeValueAsString(requestParams.get(REPOSITORY));
				final GitRepositoryRequest gitRepositoryRequest = objectMapper.readValue(repository,
					GitRepositoryRequest.class);

				return GitWebHookRequest
					.builder()
					.username(username)
					.eventType(eventName)
					.branchName(gitProjectRequest.getDefault_branch())
					.repositoryName(gitRepositoryRequest.getName())
					.gitHttpUrl(gitProjectRequest.getGit_http_url())
					.build();
			} else {
				throw new NotSupportedEventTypeException();
			}
		} catch (JsonProcessingException jsonProcessingException) {
			throw new RuntimeException(jsonProcessingException.getMessage());
		}
	}

	private static String removeExclamationMark(final String writeValueAsString) {
		return writeValueAsString.replace(REPLACE_TARGET, REPLACE_REPLACEMENT);
	}

}
