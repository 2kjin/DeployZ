import { gitlabInstance } from "./api";

// gitlab GET method with Project ID
export const requestGitlabInfo = async (hostUrl: string, projectID: string) => {
  return gitlabInstance.get(`${hostUrl}/api/v4/projects/${projectID}`);
};
