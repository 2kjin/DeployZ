import styled from "styled-components";
import { styled as mstyled } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { TextField } from "@mui/material";
import { useState } from "react";
import { ISignUpForm } from "@/types/auth";
import {
  passwordValidCheck,
  requestCheckServerKey,
  requestLogin,
  requestSignUp,
} from "@/api/auth";
import { error, success } from "@components/common/Toast/notify";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState<ISignUpForm>(INIT_SIGNGUP_DATA);
  const [passwordValid, setPasswordValid] = useState("");
  const [showPasswordHelperText, setShowPasswordHelperText] = useState(false);
  const [showValidHelperText, setShowValidHelperText] = useState(false);

  const handleSignUpForm = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name as string;
    const value = target.value as string;

    if (name === "password") {
      if (passwordValidCheck(value)) setShowPasswordHelperText(false);
      else setShowPasswordHelperText(true);
    }

    setSignUpForm((cur) => ({
      ...cur,
      [name]: value,
    }));
  };

  const handlePasswordValid = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value as string;

    if (signUpForm.password !== value) {
      setShowValidHelperText(true);
    } else {
      setShowValidHelperText(false);
    }
    setPasswordValid(value);
    console.log(showPasswordHelperText, showValidHelperText);
  };

  // const checkIdDuplicate = async () => {
  //   try {
  //     const {
  //       data: { result },
  //     } = await requestCheckDuplicate(signUpForm.account);
  //     if (result) {
  //       success("사용할 수 있는 아이디입니다.");
  //     } else {
  //       error("이미 사용중인 아이디입니다.");
  //     }
  //     console.log(result);
  //   } catch (err) {
  //     error("API 오류");
  //   }
  // };

  const checkIdServerKey = async () => {
    try {
      const {
        data: { result },
      } = await requestCheckServerKey(signUpForm.serverKey);
      if (result) {
        success("유효한 서버키입니다.");
      } else {
        error("유효하지 않은 서버키입니다.");
      }
    } catch (err) {
      error("API 오류");
    }
  };

  const sendLoginData = async () => {
    try {
      const {
        data: {
          status,
          result: { accessToken, refreshToken },
        },
      } = await requestLogin({
        account: signUpForm.account,
        password: signUpForm.password,
      });
      if (status === 200) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    } catch (err) {
      error(err.response.data.message);
    }
  };

  const sendSignUpData = async () => {
    try {
      const {
        data: { result },
      } = await requestSignUp(signUpForm);
      if (result) {
        success("회원가입완료!");
        sendLoginData();
        navigate("/additional", { replace: true });
      } else {
        error("메세지 띄우기");
      }
      console.log(result);
    } catch (err) {
      error("에러 메세지 핸들링");
    }
  };

  return (
    <Container>
      <SubjectText>사용자 등록</SubjectText>
      <EmailCheckBox>
        <CustomTextField
          autoComplete="current-password"
          color="primary"
          sx={{ width: 420 }}
          focused
          hiddenLabel
          name="account"
          placeholder="아이디를 입력하세요."
          value={signUpForm.account}
          onChange={handleSignUpForm}
        />
        {/* <ValidCheckButton onClick={checkIdDuplicate}>
          중복 확인
        </ValidCheckButton> */}
      </EmailCheckBox>
      <EmailCheckBox>
        <CustomTextField
          autoComplete="current-password"
          color="primary"
          focused
          name="serverKey"
          placeholder="서버 인증키를 입력하세요."
          value={signUpForm.serverKey}
          onChange={handleSignUpForm}
        />
        <ValidCheckButton onClick={checkIdServerKey}>
          인증키 확인
        </ValidCheckButton>
      </EmailCheckBox>
      <CustomTextField
        hiddenLabel
        type="password"
        autoComplete="current-password"
        sx={{ width: 420 }}
        color="primary"
        focused
        name="password"
        placeholder="비밀번호를 입력하세요."
        value={signUpForm.password}
        onChange={handleSignUpForm}
        helperText={
          showPasswordHelperText
            ? "비밀번호는 영문자, 숫자, 특수문자를 모두 구성하여 8~16자로 입력하세요."
            : ""
        }
      />
      <CustomTextField
        placeholder="비밀번호 확인을 입력하세요."
        hiddenLabel
        type="password"
        value={passwordValid}
        autoComplete="current-password"
        sx={{ width: 420 }}
        color="primary"
        focused
        onChange={handlePasswordValid}
        helperText={showValidHelperText ? "비밀번호와 일치하지 않습니다." : ""}
      />
      <SignUpButton onClick={sendSignUpData}>등 록</SignUpButton>
    </Container>
  );
}

const CustomTextField = mstyled(TextField)({
  width: "70%",
  height: "5rem",
  input: {
    fontSize: "1.6rem",
  },

  "& p": {
    color: "red",
    marginLeft: "5px",
    fontSize: "1.3rem",
  },

  "@media screen and (max-width: 1600px)": {
    input: {
      fontSize: "1.2rem",
    },

    "& p": {
      color: "red",
      marginLeft: "5px",
      fontSize: "1rem",
    },
  },
});

const Container = styled.div`
  width: 60rem;
  height: 55rem;
  border-radius: 0.5rem;
  background-color: ${theme.colors.container};
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1600px) {
    width: 50rem;
    height: 45rem;
    padding: 2rem 0;

    p {
      color: ${theme.colors.secondary};
      font-size: 2rem;
    }
  }
`;

const SubjectText = styled.div`
  margin: 0 auto;
  font-size: 3.5rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
`;

const EmailCheckBox = styled.div`
  width: 42rem;
  display: flex;
  justify-content: space-between;
`;

const ValidCheckButton = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  width: 10rem;
  border-radius: 0.5rem;
  font-size: 1.7rem;
  background-color: ${theme.colors.secondary};
  cursor: pointer;

  :hover {
    transition: all 0.2s ease-out;
    transform: scale(1.03);
  }
`;

const SignUpButton = styled.div`
  width: 42rem;
  color: white;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 2rem;
  padding: 1rem 0;
  background-color: ${theme.colors.secondary};
  cursor: pointer;
  :hover {
    transition: all 0.2s ease-out;
    transform: scale(1.03);
  }
`;

const INIT_SIGNGUP_DATA = {
  account: "",
  password: "",
  serverKey: "",
};
