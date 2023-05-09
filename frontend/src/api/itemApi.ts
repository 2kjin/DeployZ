import { instance } from "./api";

//아이템 상세 정보 보여주는 api -> itemDetail
export const fetchItemDetail = async (containerIdx: number) => {
  return instance.get(`/item/detail/${containerIdx}`);
};
