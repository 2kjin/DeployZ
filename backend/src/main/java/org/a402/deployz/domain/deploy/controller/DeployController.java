package org.a402.deployz.domain.deploy.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.a402.deployz.domain.deploy.response.ItemDeployResponse;
import org.a402.deployz.domain.deploy.service.DeployService;
import org.a402.deployz.domain.member.entity.Member;
import org.a402.deployz.domain.member.exception.MemberNotFoundException;
import org.a402.deployz.domain.member.repository.MemberRepository;
import org.a402.deployz.domain.project.entity.Project;
import org.a402.deployz.domain.project.exception.ProjectNotFoundException;
import org.a402.deployz.domain.project.repository.ProjectRepository;
import org.a402.deployz.domain.project.request.NginxConfigRequest;
import org.a402.deployz.domain.project.request.ProxyPathRequest;
import org.a402.deployz.global.common.BaseResponse;
import org.a402.deployz.global.error.GlobalErrorCode;
import org.a402.deployz.global.security.jwt.JwtTokenProvider;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//	| orderList() | 목록 조회 유형의 서비스 |
//	| orderDetails() | 단 건 상세 조회 유형의 controller 메서드 |
//	| orderSave() | 등록/수정/삭제 가 동시에 일어나는 유형의 controller 메서드 |
//	| orderAdd() | 등록만 하는 유형의 controller 메서드 |
//	| orderModify() | 수정만 하는 유형의 controller 메서드 |
//	| orderRemove() | 삭제만 하는 유형의 controller 메서드 |

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/deploy")
@Tag(name = "Deploy", description = "배포 관련 API")
@Slf4j
public class DeployController {

	private final DeployService deployService;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberRepository memberRepository;
	private final ProjectRepository projectRepository;

	@ApiResponse(responseCode = "200", description = "배포 처리 성공")
	@Operation(description = "아이템 배포 API", summary = "아이템 배포 API")
	@PostMapping("/{itemIdx}")
	public BaseResponse<ItemDeployResponse> itemDeploy(@Valid @PathVariable final Long itemIdx,
		@AuthenticationPrincipal UserDetails userDetails) {
		ItemDeployResponse itemDeployResponse = deployService.itemDeploy(itemIdx, userDetails);
		return new BaseResponse<>(itemDeployResponse);
	}
	// 테스트용 컨트롤러
	// public BaseResponse<ItemDeployResponse> itemDeploy(@Valid @PathVariable final Long itemIdx) {
	// 	ItemDeployResponse itemDeployResponse = deployService.itemDeploy(itemIdx);
	// 	return new BaseResponse<>(itemDeployResponse);
	// }

	// @FIXME: delete later
	@GetMapping("/token")
	public BaseResponse<String> token() {
		Member member =  memberRepository.findMemberByIdx(1L)
			.orElseThrow(MemberNotFoundException::new);
		String token = jwtTokenProvider.createAccessToken(member);
		return new BaseResponse<>(token);
	}

	// @FIXME: delete later
	@GetMapping("/default.conf")
	public BaseResponse<Void> conf() {
		ProxyPathRequest proxyPathRequest = new ProxyPathRequest(1, "http://localhost:8080", "/dev");
		List<ProxyPathRequest> pathRequestList = new ArrayList<>();
		pathRequestList.add(proxyPathRequest);

		NginxConfigRequest nginxConfigRequest = new NginxConfigRequest("k8a4021.p.ssafy.io", "/etc/letsencrypt/live/k8a4021.p.ssafy.io/fullchain.pem"
		,"/etc/letsencrypt/live/k8a4021.p.ssafy.io/privkey.pem", pathRequestList);
		deployService.nginxConfig(nginxConfigRequest, 3000L);
		return new BaseResponse<>(GlobalErrorCode.SUCCESS);
	}

}
