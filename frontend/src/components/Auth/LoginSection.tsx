import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ILoginForm } from "@/types/auth";
import { requestLogin } from "@/api/auth";
import { error, success } from "@components/common/Toast/notify";

export default function LoginSection() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<ILoginForm>(INIT_LOGIN_DATA);

  const handleLoginForm = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as string;
    const value = target.value as string;

    setLoginForm((cur) => ({
      ...cur,
      [name]: value,
    }));
  };

  const sendLoginData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 동작 방지

    try {
      const {
        data: {
          status,
          result: { accessToken, refreshToken },
        },
      } = await requestLogin(loginForm);
      if (status === 200) {
        success("로그인 완료");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/project");
      } else {
        error("로그인 정보를 확인하세요.");
      }
    } catch (err) {
      error(err.response.data.message);
    }
  };

  return (
    <Container>
      <LoginImg />
      <CustomForm onSubmit={sendLoginData}>
        <CustomTextField
          autoComplete="current-password"
          color="primary"
          focused
          hiddenLabel
          name="account"
          placeholder="example123"
          value={loginForm.account}
          onChange={handleLoginForm}
        />
        <CustomTextField
          placeholder="비밀번호를 입력하세요."
          type="password"
          autoComplete="current-password"
          color="primary"
          name="password"
          focused
          hiddenLabel
          value={loginForm.password}
          onChange={handleLoginForm}
        />
        <LoginButton type="submit" value="Login" />
      </CustomForm>
      <TextBox>
        <NavText>비밀번호를 잊으셨나요?</NavText>
        <NavText onClick={() => navigate("/signup")}>회원가입 하러가기</NavText>
      </TextBox>
    </Container>
  );
}

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 35%;
`;

const CustomTextField = mstyled(TextField)({
  width: "400px",
  input: {
    fontSize: "1.6rem",
  },

  "@media screen and (max-width: 1600px)": {
    width: "300px",
    input: {
      fontSize: "1.3rem",
    },
  },
});

const NavText = styled.div`
  cursor: pointer;
  display: block;
  font-size: 1.6rem;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;

  :hover {
    transform: scale(1.03);
    transition: all 0.2s ease-out;
  }

  @media screen and (max-width: 1600px) {
    font-size: 1.4rem;
  }
`;

const TextBox = styled.div`
  width: 40rem;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1600px) {
    width: 30rem;
  }
`;

const Container = styled.div`
  width: 60rem;
  height: 65rem;
  padding: 4rem 0;
  border-radius: 1.5rem;
  background-color: ${theme.colors.container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media screen and (max-width: 1600px) {
    width: 50rem;
    height: 55rem;
    padding: 2rem 0;
  }
`;

const LoginImg = styled.img`
  height: 20rem;
  margin: 0 auto;
  @media screen and (max-width: 1600px) {
    height: 15rem;
  }
`;

const LoginButton = styled.input`
  width: 40rem;
  font-size: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  padding: 1rem 0;
  background-color: ${theme.colors.secondary};
  border: none;
  font-weight: blod;
  color: white;
  cursor: pointer;

  :hover {
    transform: scale(1.03);
    transition: all 0.2s ease-out;
  }
  @media screen and (max-width: 1600px) {
    width: 30rem;
    font-size: 1.8rem;
  }
`;

const INIT_LOGIN_DATA = {
  account: "",
  password: "",
};
