import { gitlabInstance, instance } from "./api";

// gitlab GET method by Project ID
export const requestGitlabInfo = async (hostUrl: string, projectID: string) => {
  return gitlabInstance.get(`${hostUrl}/api/v4/projects/${projectID}`);
};

// gitlab GET method by Project ID
export const requestGitlabBranch = async (
  hostUrl: string,
  projectID: string
) => {
  return gitlabInstance.get(
    `${hostUrl}/api/v4/projects/${projectID}/repository/branches`
  );
};

// framework 빌드 버전 조회
export const requestVersion = async (framework: string) => {
  return instance.get(`/project/buildVersion/${framework}`);
};

// 프로젝트 생성
export const requestCreateProject = async (projectInfo: IProject) => {
  return instance.post(`/project`, projectInfo);
};

// 포트 중복 검사
export const requestIsDuplicate = async (num1: string, num2: string) => {
  return instance.get(`/project/container?port1=${num1}&port2=${num2}`);
};

// 시크릿 토큰 생성
export const requestSecretToken = async (branchName: String) => {
  return instance.get(`project/git/secret-token?branchName=${branchName}`);
};
