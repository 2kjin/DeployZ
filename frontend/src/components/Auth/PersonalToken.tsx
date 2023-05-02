import styled from "styled-components";
import { theme } from "@/styles/theme"
import { FormControl, InputBase, InputLabel } from "@mui/material";
import { alpha, styled as mstyled } from "@mui/material/styles";

export default function PersonalToken() {

  return (
  <Container>
    <Box>
      1. 깃랩 로그인 후 '우측' 상단 Edit profile 클릭
      2. '좌측' Menu tab 에서 access tokens 클릭
      3. Token name 임의대로 입력
      4. Expiration date(만료 기한)을 '한달' 뒤로 설정
      5. Select scopes '모두' 체크
      6. Create personal access token 클린
      7. Your new personal access token 를 입력
      * 해당 페이지를 벗어나면 personal access token 이 사라지므로 잘 저장 해놓기
      <FormControl variant="standard">
          <InputLabel
            shrink
            sx={{
              fontSize: "2.6rem",
              fontWeight: "700",
              color: "#151649",
            }}
          >
            Hoost URL
          </InputLabel>
          <InputBox
            widthnum={"50rem"}
            fontnum={"2rem"}
            spacingnum={4}
            placeholder={`ex) https://lab.ssafy.com`}
          />
        </FormControl>
    </Box>
  </Container>
  )
}
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

const Container = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  height : 93vh;
  width : 100%;
`
const Box = styled.div`
  width: 35vw;
  height: 75vh;
  background-color: ${theme.colors.container};
  border-radius: 3rem;
`