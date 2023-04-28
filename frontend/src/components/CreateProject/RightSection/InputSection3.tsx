import { theme } from "@/styles/theme";
import styled from "styled-components";
import { alpha, styled as mstyled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { FormControl, InputLabel } from "@mui/material";
import { useRecoilState } from "recoil";
import { gitState, projectState } from "@/recoil/step";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";
import MouseIcon from "@mui/icons-material/Mouse";
import { useEffect, useState } from "react";

export default function InputSection2() {
  const [project, setProject] = useRecoilState<IProject>(projectState);
  const [gitConfig, setGitConfig] = useRecoilState<IGitConfig>(gitState);
  const [checkStatus, setCheckStatus] = useState<boolean>(false);

  const itemName = project.itemList.map((item: IItem) => {
    return [item.itemName, item.secretToken];
  });

  // 연결 확인 버튼
  const handleValidCheck = () => {
    setCheckStatus((prev) => !prev);
  };

  // 컴포넌트 state의 change handler
  const handleItemData = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id as string;
    const value = target.value as string;

    setGitConfig((cur) => ({
      ...cur,
      [id]: value,
    }));
  };

  useEffect(() => {
    setProject((prev) => ({
      ...prev,
      gitConfig: gitConfig,
    }));
  }, [gitConfig]);

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
            id="repositoryUrl"
            value={gitConfig.repositoryUrl}
            onChange={handleItemData}
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
            id="projectId"
            value={gitConfig.projectId}
            onChange={handleItemData}
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
          <SectionGuide>
            <p>방법을 잘 모르시겠다면,</p>
            {"  "}
            <GuildButton>
              가이드 보러가기{" "}
              <MouseIcon sx={{ fontSize: 18, marginLeft: 0.3 }} />
            </GuildButton>
          </SectionGuide>
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
              id="hostUrl"
              value={gitConfig.hostUrl}
              onChange={handleItemData}
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
            <InputBoxSmall
              placeholder={`ex) adyjk1ad6dfd`}
              id="accessToken"
              value={gitConfig.accessToken}
              onChange={handleItemData}
            />
          </FormControl>
        </Section>
        <Section>
          <Label>연결상태확인</Label>
          <p>
            모든 정보 입력 후, 레포지토리와 연결이 잘 되었는지 확인해야해요!
          </p>
          <SectionCheck>
            <StatusBox isValid={checkStatus}>
              {!checkStatus && "확인 필요"}
              {checkStatus && "확인 완료"}
            </StatusBox>
            <CheckButton onClick={handleValidCheck}>연결 상태 확인</CheckButton>
          </SectionCheck>
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

const GuildButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px ${theme.colors.secondary};
  color: ${theme.colors.secondary};
  font-size: 1.5rem;
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1rem;

  :hover {
    color: white;
    background-color: ${theme.colors.secondary};
    transition: all 0.3s ease-out;
  }
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

const SectionGuide = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0.3rem 0.1rem;
  }
`;

const SectionCheck = styled.div`
  display: flex;
  align-items: center;
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

const StatusBox = styled.div<{ isValid: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.isValid ? theme.colors.complete : theme.colors.lightgray};
  color: ${(props) =>
    props.isValid ? theme.colors.checkgreen : theme.colors.darkgray};

  span {
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
`;

const CheckButton = styled.div`
  padding: 1.5rem 2rem;
  margin-left: 1.5rem;
  background-color: ${theme.colors.secondary};
  border-radius: 5px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: bolder;

  :hover {
    transform: scale(1.03);
  }
`;
