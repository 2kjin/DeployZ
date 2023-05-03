import { instance } from "./api";
import { itemDetailInfo } from "@/types/item";

//아이템 상세 정보 보여주는 api -> itemDetail
export const fetchItemDetail = async (containerIdx: number) => {
  return instance.get(`/item/detail/${containerIdx}`);
};

//아이템 삭제 api
export const itemDelete = async (containerIdx: number) => {
  return instance.delete(`/item/${containerIdx}`);
};
