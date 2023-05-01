import { itemListInfo } from "./item";

//프로젝트 목록 조회 type
export interface projectListInfo {
  idx: number;
  projectName: string;
  itemCnt: number;
  isSuccess: string;
  lastSuccessDate: string;
  itemName: string;
  lastFailedDate: string;
}

export interface projectDetailInfo {
  projectName: string;
  itemList: itemListInfo[];
}
