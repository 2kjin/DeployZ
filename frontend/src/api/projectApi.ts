import { instance } from "./api";
import { projectListInfo, projectDetailInfo } from "@/types/project";

//사용자의 프로젝트 리스트를 보여주는 api
export const fetchProjectList = async () => {
  return instance.get(`/project`);
};

//하나의 프로젝트에 대한 상세 정보 api->
//아이템 리스트 화면으로 렌딩
export const fetchProjectDetail = async (projectIdx: number) => {
  return instance.get(`/item/${projectIdx}`);
};
