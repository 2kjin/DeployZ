import axios from "axios";
import { getPersonalToken } from "./auth";

const SERVER_URL = import.meta.env.VITE_SERVER_DOMAIN;
// const MINSU = "http://70.12.247.126:8080/api";

// JWT 토큰이 필요한 instance
export const instance = axios.create({
  // withCredentials: true,
  // baseURL: SERVER_URL,
  baseURL: SERVER_URL,
});

export const testInstance = axios.create({
  baseURL: "http://k8a4021.p.ssafy.io:8888/api",
});

// JWT 토큰이 필요없는 instance
export const noValidInstance = axios.create({
  baseURL: SERVER_URL,
});

// gitlab instance
export const gitlabInstance = axios.create({});

// gitlab personal token을 헤더에 담아서 요청을 보내는 interceptors
gitlabInstance.interceptors.request.use(async function (config) {
  const {
    data: { result },
  } = await getPersonalToken();
  config.headers["PRIVATE-TOKEN"] = result;
  return config;
});

// instance요청에 header에 토큰을 담는 interceptors
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

// instance요청에 header에 토큰을 담는 interceptors
testInstance.interceptors.request.use(
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

/** 401 Error : acess token이 만료되어 발생
 * 프론트는 401이 발생할때마다 refresh 보내서 새로운 access 토큰 받아옴과
 * 동시에 api 재요청이 새로운 acess 토큰으로 가야함
 */

// instance.interceptors.response.use(
//   function (config) {
//     return config;
//   },
//   async function (error) {
//     const refreshToken = localStorage.getItem("refreshToken");
//     // HTTP 응답 에러발생 => accessToekn 만료
//     if (error.response.status === 401 || error.response.status === 403) {
//       try {
//         const response = await requestReCreate(refreshToken);
//         // 새로운 access token 받아옴
//         const newAccessToken = response.data.accessToken;
//         const config = error.config;
//         config.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axios(config);
//       } catch (e) {
//         // TODO: requestToken API 호출도 실패하면 로그인 페이지로 이동하거나, 다시 로그인 요청을 하도록 처리
//         console.error(e);
//         requestLogout();
//         location.reload();
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
