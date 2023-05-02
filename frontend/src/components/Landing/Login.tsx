import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestLogin, tempRequest } from "@/api/auth";
import { IUserInfo } from "types/auth";

const InitUser = {
  email: "",
  password: "",
};

export default function LoginSection() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserInfo>(InitUser);

  const handleInputValue = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as string;
    const value = target.value as string;

    setUser((cur) => ({
      ...cur,
      [name]: value,
    }));
  };

  /** 로그인 API
   * 로컬 로그인의 경우,
   * refreshToken은 cookie로
   * userId, nicname, accessToken은 localStorage로
   */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 동작 방지
    try {
      const {
        data: {
          accessToken,
          user: { nickname, userId, profileImageType, email },
        },
      } = await requestLogin(user);
      if (nickname === null) {
        navigate("/additional", { state: { userId: userId } });
      } else {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("userId", userId);
        localStorage.setItem("profileImageType", profileImageType);
        localStorage.setItem("email", email);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
      // TODO: 로그인 실패 TOAST 추가하자
      handleToastClick("error", "이메일, 비밀번호를 확인해주세요.");
    }
  };
