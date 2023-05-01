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
    return {
      idx: 1,
      itemName: "FE",
      status: "success",
      frameworkType: "react",
      portNumber1: 3000,
      portNumber2: 3001,
      itemStates: "success",
      lastSuccessDate: "3days 17hr",
      lastFailedDate: "1days 5hr",
      itemHistories: [
        {
          idx: 1,
          status: "#123",
          state: "success",
          message: "콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔",
          registerTime: "23.04.19 11:04:23",
        },
        {
          idx: 2,
          status: "#124",
          state: "success",
          message:
            "콘솔콘솔콘솔콘솔123콘솔콘솔콘솔콘솔123콘솔콘솔콘솔콘솔123콘솔",
          registerTime: "23.04.19 11:04:23",
        },
        {
          idx: 3,
          status: "#125",
          state: "fail",
          message:
            "11111111111콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔55555555555콘솔콘솔콘솔콘솔콘솔콘솔",
          registerTime: "23.04.19 11:04:23",
        },
        {
          idx: 4,
          status: "#126",
          state: "fail",
          message:
            "콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔4564564654콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔콘솔6456165464콘솔콘솔콘솔콘솔콘솔콘솔",
          registerTime: "23.04.19 11:04:23",
        },
      ],
      itemProgresses: {
        builds: [
          {
            idx: 1,
            status: "success",
          },
          {
            idx: 2,
            status: "fail",
          },
        ],
        deploys: [
          {
            idx: 1,
            status: "success",
          },
          {
            idx: 2,
            status: "fail",
          },
        ],
        runs: [
          {
            idx: 1,
            status: "success",
          },
          {
            idx: 2,
            status: "fail",
          },
        ],
      },
    };
  }
};
