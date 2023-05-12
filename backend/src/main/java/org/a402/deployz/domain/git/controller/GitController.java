package org.a402.deployz.domain.git.controller;

import java.util.Map;

import org.a402.deployz.domain.git.request.GitWebHookRequest;
import org.a402.deployz.domain.git.service.GitService;
import org.a402.deployz.global.common.BaseResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/git")
public class GitController {
	private final GitService gitService;

	@PostMapping("/webhook")
	public BaseResponse<Void> detectWebHook(@RequestHeader(name = "X-Gitlab-Token") String gitlabToken,
		@RequestBody Map<String, Object> requestParams) {
		log.info("webhook start");
		log.info("webhook X-Gitlab-Token: {}", gitlabToken);
		final GitWebHookRequest gitWebHookRequest = gitService.detectWebHook(requestParams);

		return new BaseResponse<>();
	}
}
