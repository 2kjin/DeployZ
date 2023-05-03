import { instance } from "./api";
import { itemDetailInfo } from "@/types/item";

//아이템 상세 정보 보여주는 api -> itemDetail
export const fetchItemDetail = async (
  containerIdx: number
): Promise<itemDetailInfo> => {
  try {
    const res = await instance.get<itemDetailInfo>(
      `/item/detail/${containerIdx}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//아이템 삭제 api
export const itemDelete = async (containerIdx: number) => {
  return instance.delete(`/item/${containerIdx}`);
};
