import { itemBuildCount } from "./item";

//프로젝트 목록 조회 type
export interface projectListInfo {
  idx: number;
  itemBuildCnt: itemBuildCount[];
  lastSuccessDate: string;
  lastFailureDate: string;
  projectName: string;
  projectDesc: string;
  status: string;
}

//하나의 프로젝트에 속한 아이템 목록 조회 type
export interface projectDetailInfo {
  idx: number;
  lastFailureDate: string;
  lastSuccessDate: string;
  name: string;
  portNumber1: number;
  portNumber2: number;
  projectName: string;
  status: string;
}
