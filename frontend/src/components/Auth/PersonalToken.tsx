import styled from "styled-components";
import { theme } from "@/styles/theme"
import { FormControl, InputBase, InputLabel } from "@mui/material";
import { alpha, styled as mstyled } from "@mui/material/styles";
import { requestPersonalToken } from "@/api/auth";
import { IPersoanlToken } from "@/types/auth";

const personalToken: IPersoanlToken = {
  personaltoken: "",
};

export default function PersonalToken() {
  const createPersonalToken = async () => {
    const personalTokenInfo = {
      personaltoken: personalToken.personaltoken,
    };
    await requestPersonalToken(personalTokenInfo);
  };
  console.log(createPersonalToken)
  
  return (
  <Container>
    <Box>
      <Title>
        Personal Access Token 가이드
      </Title>
      <Text>
      1. 깃랩 로그인 후 '우측' 상단 Edit profile 클릭</Text>
      <Text>
      2. '좌측' Menu tab 에서 access tokens 클릭</Text>
      <Text>
      3. Token name 임의대로 입력</Text>
      <Text>
      4. Expiration date(만료 기한)을 '한달' 뒤로 설정</Text>
      <Text>
      5. Select scopes '모두' 체크</Text>
      <Text>
      6. Create personal access token 클린</Text>
      <Text>
      7. Your new personal access token 를 입력</Text>
      <Text1>
      * 해당 페이지를 벗어나면 token 재 확인 불가로 저장 해놓기</Text1>
      <FormControl variant="standard">
        <InputLabel
          shrink
          sx={{
            fontSize: "2.6rem",
            fontWeight: "700",
            color: "#151649",
          }}
        >
          Personal Access Token
        </InputLabel>
        <InputBox
          widthnum={"50rem"}
          fontnum={"2rem"}
          spacingnum={4}
          placeholder={`ex) RIiCysmWxzLKJyETfaqf`}
        />
      </FormControl>
      <SaveBtn onClick={createPersonalToken}>저장</SaveBtn>
    </Box>
  </Container>
  )
}
const Container = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  height : 93vh;
  width : 100%;
`
const Box = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 30vw;
  height: 70vh;
  background-color: ${theme.colors.container};
  border-radius: 3rem;
  padding: 5rem;
`
const InputBox = mstyled(InputBase)<{
  widthnum: string;
  fontnum: string;
  spacingnum: number;
}>(
  ({
    theme,
    widthnum: widthnum,
    fontnum: fontnum,
    spacingnum: spacingnum,
  }) => ({
    "label + &": {
      marginTop: theme.spacing(spacingnum),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: fontnum,
      width: widthnum,
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
      ]),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
      // 글꼴 설정 추가
      fontFamily: "Pretendard",
    },
  })
);
const Title = styled.div`
  font-size: 3.5rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
  padding: 3rem;
`
const Text = styled.div`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.primary};
  padding: 1rem;
`
const Text1 = styled.div`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.primary};
  padding-bottom: 5rem;
`
const SaveBtn = styled.div`
  padding: 1rem 2rem;
  margin:2rem;
  background-color: ${theme.colors.primary};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  :hover {
    transform: scale(1.03);
    background-color: ${theme.colors.secondary};
    transition: all 0.2s ease-out;
    cursor: pointer;
  }
`;