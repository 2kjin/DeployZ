import axios from "axios";
import { instance } from "./api";
import { IPersoanlToken } from "@/types/auth";


// 로그아웃
export const requestLogout = async () => {
  localStorage.clear();
};

// 추가 정보 입력
export const requestPersonalToken = async (personalAccessToken: IPersoanlToken) => {
  return await instance.post(`/member`, personalAccessToken);
};
