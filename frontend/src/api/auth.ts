import { ILoginForm } from "./../types/auth";
import { instance, noValidInstance } from "./api";
import { IPersoanlToken, ISignUpForm } from "@/types/auth";

/**
 * @param password 유효성 체크하고싶은 비밀번호
 * @returns {boolean}
 * @comment 비밀번호 유효성 체크
 */
export const passwordValidCheck = (password: string) => {
  const reg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()\\-_=+])[A-Za-z\d~!@#$%^&*()\\-_=+]{8,16}$/;
  return reg.test(password);
};

// 로그아웃
export const requestLogout = async () => {
  localStorage.clear();
};

// 로그인
export const requestLogin = async (data: ILoginForm) => {
  return await noValidInstance.post(`/api/member/login`, data);
};

// 회원가입
export const requestSignUp = async (data: ISignUpForm) => {
  return await noValidInstance.post(`/api/member/signup`, data);
};

// 아이디 중복 검사 => 미사용
export const requestCheckDuplicate = async (account: string) => {
  return await noValidInstance.get(
    `/api/member/checkDuplicateAccount?account=${account}`
  );
};

// 서버키 유효 검사
export const requestCheckServerKey = async (serverkey: string) => {
  return await noValidInstance.post(`/api/member/validateServerKey`, {
    serverKey: serverkey,
  });
};

// 추가 정보 입력
export const requestPersonalToken = async (
  personalAccessToken: IPersoanlToken
) => {
  return await instance.post(
    `/api/member/personalAccessToken`,
    personalAccessToken
  );
};

// private-token 요청
export const getPersonalToken = async () => {
  return await instance.get(`/api/member/personalAccessToken`);
};

// accessToken 재발급
export const requestReCreate = async (refresh: string) => {
  return await instance.post(`/api/${refresh}`);
};
