import axios from "axios";
import { getPersonalToken } from "./auth";

const SERVER_URL = import.meta.env.VITE_SERVER_DOMAIN;

export const instance = axios.create({
  // withCredentials: true,
  baseURL: SERVER_URL,
});

export const gitlabInstance = axios.create({
});

gitlabInstance.interceptors.request.use(
  async function (config) {
    const { data : {result}} = await getPersonalToken();
    config.headers["PRIVATE-TOKEN"] = result;
    return config
  } 
)

/** 401 Error : acess token이 만료되어 발생
 * 프론트는 401이 발생할때마다 refresh 보내서 새로운 access 토큰 받아옴과
 * 동시에 api 재요청이 새로운 acess 토큰으로 가야함
 */

// interceptors를 통해
instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    // 요청 바로 직전
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
