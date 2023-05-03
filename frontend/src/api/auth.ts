import axios from "axios";
import { instance } from "./api";
import { IPersoanlToken } from "@/types/auth";

// 로그아웃
export const requestLogout = async () => {
  localStorage.clear();
};

// 추가 정보 입력
export const requestPersonalToken = async (user: IPersoanlToken) => {
  const PersoanlTokenData: IPersoanlToken = {
    personalAccessToken: user.personalAccessToken,
  };
  const url = `https://lab.ssafy.com/api/v4/projects/?access_token=${PersoanlTokenData.personalAccessToken}`;
  console.log(url)
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return await instance.post(`/member`, PersoanlTokenData);
    }
  } catch (error) {
    if (error.response.status === 401) {
      alert("Personal access token 이 아닙니다. 토큰 정보를 확인해주세요.");
    }
  }
};
