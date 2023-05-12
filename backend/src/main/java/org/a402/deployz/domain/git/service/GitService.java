package org.a402.deployz.domain.git.service;

import java.util.Map;

import org.a402.deployz.domain.git.exception.NotSupportedEventTypeException;
import org.a402.deployz.domain.git.request.GitProjectRequest;
import org.a402.deployz.domain.git.request.GitRepositoryRequest;
import org.a402.deployz.domain.git.request.GitWebHookRequest;
import org.a402.deployz.global.security.jwt.JwtTokenProvider;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class GitService {
	public static final String EVENT_NAME = "object_kind";
	public static final String PUSH = "push";
	public static final String PROJECT = "project";
	public static final String REPOSITORY = "repository";
	public static final String MERGE_REQUEST = "merge_request";
	public static final String REPLACE_TARGET = "\"";
	public static final String REPLACE_REPLACEMENT = "";
	private final JwtTokenProvider jwtTokenProvider;

	public GitWebHookRequest detectWebHook(final String secretToken, final Map<String, Object> requestParams) {
		final GitWebHookRequest gitWebHookRequest = parseBuildData(secretToken, requestParams);

		log.info("GitWebHookHttpUrl: {}", gitWebHookRequest.getGitHttpUrl());
		log.info("GitWebHookEventType: {}", gitWebHookRequest.getEventType());
		log.info("GitWebHookRepositoryName: {}", gitWebHookRequest.getRepositoryName());

		return gitWebHookRequest;
	}

	public GitWebHookRequest parseBuildData(final String secretToken, final Map<String, Object> requestParams) {
		final ObjectMapper objectMapper = new ObjectMapper();

		final String branchName = jwtTokenProvider.getBranchName(secretToken);
		log.info("webhook X-Gitlab-Token branchName: {}", branchName);

		try {
			final String eventName = removeExclamationMark(objectMapper.writeValueAsString(requestParams.get(EVENT_NAME)));
			log.info("webhook event type: {}", eventName);

			if (eventName.equals(PUSH)) {
				final String projectObject = objectMapper.writeValueAsString(requestParams.get(PROJECT));
				final GitProjectRequest gitProjectRequest = objectMapper.readValue(projectObject, GitProjectRequest.class);
				final String repository = objectMapper.writeValueAsString(requestParams.get(REPOSITORY));
				final GitRepositoryRequest gitRepositoryRequest = objectMapper.readValue(repository, GitRepositoryRequest.class);

				return GitWebHookRequest.builder()
					.branchName(branchName)
					.eventType(eventName)
					.repositoryName(gitRepositoryRequest.getName())
					.gitHttpUrl(gitProjectRequest.getGit_http_url())
					.projectId(gitProjectRequest.getId())
					.build();
			} else if (eventName.equals(MERGE_REQUEST)) {
				final String project = objectMapper.writeValueAsString(requestParams.get(PROJECT));
				final GitProjectRequest gitProjectRequest = objectMapper.readValue(project, GitProjectRequest.class);
				final String repository = objectMapper.writeValueAsString(requestParams.get(REPOSITORY));
				final GitRepositoryRequest gitRepositoryRequest = objectMapper.readValue(repository,
					GitRepositoryRequest.class);

				return GitWebHookRequest
					.builder()
					.branchName(branchName)
					.eventType(eventName)
					.repositoryName(gitRepositoryRequest.getName())
					.gitHttpUrl(gitProjectRequest.getGit_http_url())
					.projectId(gitProjectRequest.getId())
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
