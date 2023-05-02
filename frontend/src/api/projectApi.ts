import { instance } from "./api";
import { projectListInfo, projectDetailInfo } from "@/types/project";

//사용자의 프로젝트 리스트를 보여주는 api
export const fetchProjectList = async (): Promise<projectListInfo[]> => {
  try {
    const res = await instance.get<{ data: projectListInfo[] }>("/project");
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [
      {
        idx: 1,
        projectName: "프로젝트1번",
        itemCnt: 3,
        isSuccess: "fail",
        lastSuccessDate: "3days 11hr",
        itemName: "#FE",
        lastFailedDate: "4days 2hr",
      },
      // {
      //   idx: 2,
      //   projectName: "프로젝트2번",
      //   itemCnt: 4,
      //   isSuccess: "success",
      //   lastSuccessDate: "3days 11hr",
      //   itemName: "#BE",
      //   lastFailedDate: "4days 2hr",
      // },
      // {
      //   idx: 3,
      //   projectName: "프로젝트3번",
      //   itemCnt: 2,
      //   isSuccess: "success",
      //   lastSuccessDate: "3days 11hr",
      //   itemName: "#DJANGO",
      //   lastFailedDate: "4days 2hr",
      // },
    ];
  }
};

//하나의 프로젝트에 대한 상세 정보 api->
//아이템 리스트 화면으로 렌딩
export const fetchProjectDetail = async (
  projectIdx: number
): Promise<projectDetailInfo> => {
  try {
    const res = await instance.get<projectDetailInfo>(
      `/project/detail/${projectIdx}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      projectName: "프로젝트1번",
      itemList: [
        {
          idx: 1,
          itemName: "FE",
          status: "success",
          portNumber1: 3000,
          portNumber2: 3001,
          lastSuccessDate: "3days 2hr",
          lastFailedDate: "3days 5hr",
        },
        {
          idx: 2,
          itemName: "BE",
          status: "success",
          portNumber1: 8000,
          portNumber2: 8001,
          lastSuccessDate: "3days 2hr",
          lastFailedDate: "3days 5hr",
        },
        {
          idx: 3,
          itemName: "DJANGO",
          status: "",
          portNumber1: 9000,
          portNumber2: 9001,
          lastSuccessDate: "3days 2hr",
          lastFailedDate: "3days 5hr",
        },
      ],
    };
  }
};
