import { theme } from "@/styles/theme";
import styled from "styled-components";
import { alpha, styled as mstyled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { FormControl, InputLabel } from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { itemListState, projectState } from "@/recoil/step";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";

export default function InputSection2() {
  const project = useRecoilValue<IProject>(projectState);
  const itemName = project.itemList.map((item: IItem) => {
    return [item.itemName, item.secretToken];
  });
  return (
    <Container>
      <p className="subject">Git 정보 입력</p>
      {/* 첫째 줄 */}
      <InputContainer>
        <FormControl variant="standard">
          <InputLabel
            shrink
            sx={{
              fontSize: "2.6rem",
              fontWeight: "700",
              color: "#151649",
            }}
          >
            Repository 주소
          </InputLabel>
          <InputBox
            placeholder={`배포하고자 하는 프로젝트 레포지토리 주소를 입력하세요.`}
            id="itemName"
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel
            shrink
            sx={{
              fontSize: "2.6rem",
              fontWeight: "700",
              color: "#151649",
            }}
          >
            Project ID
          </InputLabel>
          <InputBox
            placeholder={`해당 레포지토리의 project id를 입력하세요.`}
            id="itemName"
          />
        </FormControl>
      </InputContainer>

      {/* 둘째 줄 */}
      <InputContainer>
        <Section>
          <Label>Webhook 연결</Label>
          <p>
            자동 배포 기능을 사용하려면 레포지토리에 직접 Branch별로 Webhook을
            연결해야해요.
          </p>
          <span>방법을 잘 모르시겠다면,</span>{" "}
          <span>
            <b>버튼!</b>
          </span>
        </Section>
        <Section>
          <Label>Secret Token</Label>
          {itemName.map((item) => {
            return (
              <SecretSection>
                <SecretLeft># {item[0]}</SecretLeft>
                <SecretRight>{item[1]}</SecretRight>
              </SecretSection>
            );
          })}
          <SecretLeft className="alert">
            <SdCardAlertIcon sx={{ fontSize: "2.5rem" }} />
            Secret Token은 따로 저장해 보관해야해요!
          </SecretLeft>
        </Section>
      </InputContainer>

      {/* 셋째 줄 */}
      <InputContainer>
        <Section>
          <Label>Gitlab Connect Credential</Label>
          <FormControl variant="standard" sx={{ marginTop: "2%" }}>
            <InputLabel
              shrink
              sx={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#151649",
              }}
            >
              Host URL
            </InputLabel>
            <InputBoxSmall
              placeholder={`ex) https://lab.ssafy.com/`}
              id="itemName"
            />
          </FormControl>
          <FormControl variant="standard" sx={{ marginTop: "2%" }}>
            <InputLabel
              shrink
              sx={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#151649",
              }}
            >
              Gitlab Access Token
            </InputLabel>
            <InputBoxSmall placeholder={`ex) adyjk1ad6dfd`} id="itemName" />
          </FormControl>
        </Section>
        <Section>
          <Label>연결상태확인</Label>
        </Section>
      </InputContainer>
    </Container>
  );
}

const InputBox = mstyled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(4),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 14,
    width: "40rem",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color"]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    // 글꼴 설정 추가
    fontFamily: "Pretendard",
  },
}));

const InputBoxSmall = mstyled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3.2),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 12,
    width: "30rem",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color"]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    // 글꼴 설정 추가
    fontFamily: "Pretendard",
  },
}));

const Container = styled.div`
  background-color: #fff;
  /* background-color: ${theme.colors.container}; */
  flex: 4;
  margin: 2rem 1.5rem;
  border-radius: 1rem;
  padding: 1.5rem;
  color: ${theme.colors.primary};

  .subject {
    font-size: 3.7rem;
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const InputContainer = styled.div`
  width: 82%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
`;

const Label = styled.h4`
  font-size: 2rem;
  font-weight: 700;
  color: #151649;
  margin: 0;
`;

const Section = styled.div`
  width: 42rem;

  .alert {
    font-size: 1.5rem;
    color: ${theme.colors.error};
    display: flex;
    align-items: center;
  }

  p,
  span {
    font-size: 1.5rem;
  }
`;

const SecretSection = styled.div`
  display: flex;
  width: 100%;
`;

const SecretLeft = styled.div`
  flex: 0.8;
  font-weight: bold;
  font-size: 1.7rem;
  padding: 1rem 0;
`;

const SecretRight = styled.div`
  font-size: 1.5rem;
  flex: 2;
  display: flex;
  align-items: center;
`;
