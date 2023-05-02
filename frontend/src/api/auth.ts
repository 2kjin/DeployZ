import { instance } from "./api";
import { IPersoanlToken } from "@/types/auth";

// 로그아웃
export const requestLogout = async () => {
  localStorage.clear();
};

// 추가 정보 입력
export const requestPersonalToken = async (user: IPersoanlToken) => {
  const PersoanlTokenData: IPersoanlToken = {
    personaltoken: user.personaltoken,
  };
  return await instance.post(`/member`, PersoanlTokenData);
};
