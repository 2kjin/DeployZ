import { itemListInfo } from "./item";

//프로젝트 목록 조회 type
export interface projectListInfo {
  idx: number;
  itemCnt: number;
  lastSuccessDate: string;
  lastFailureDate: string;
  memberIdx: number;
  projectName: string;
  status: string;
  itemName: string;
}

//하나의 프로젝트에 속한 아이템 목록 조회 type
export interface projectDetailInfo {
  idx: number;
  lastFailureDate: string;
  lastSuccessDate: string;
  name: string;
  portNumber1: number;
  portNumber2: number;
  status: string;
}
