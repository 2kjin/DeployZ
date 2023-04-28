import { theme } from "@/styles/theme";
import styled from "styled-components";
import { FormControl, InputBase, InputLabel } from "@mui/material";
import { alpha, styled as mstyled } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { projectConfigState } from "@/recoil/step";
import { useEffect, useState } from "react";
import { requestGitlabInfo } from "@/api/projectCreate";

export default function InputSection2() {
  const [projectConfig, setProjectConfig] =
    useRecoilState<IProjectConfig>(projectConfigState);
  const [repoInfo, setRepoInfo] = useState("");

  // 컴포넌트 state의 change handler
  const handleItemData = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id as string;
    const value = target.value as string;

    setProjectConfig((cur) => ({
      ...cur,
      [id]: value,
    }));
  };

  useEffect(() => {
    const temp = async () => {
      const res = await requestGitlabInfo(
        projectConfig.hostUrl,
        projectConfig.projectId
      );
      console.log(res.data.name);
      setRepoInfo(res.data.name);
    };
    try {
      temp();
    } catch (error) {}
  }, [projectConfig.projectId]);

  return (
    <Container>
      <p className="subject">Project 설정 정보 입력</p>
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
            widthsize={"30rem"}
            fontsize={"1.4rem"}
            spacingsize={4}
            placeholder={`ex) https://lab.ssafy.com/`}
            id="hostUrl"
            value={projectConfig.hostUrl}
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
            widthsize={"30rem"}
            fontsize={"1.4rem"}
            spacingsize={4}
            placeholder={`해당 레포지토리의 project id를 입력하세요.`}
            id="projectId"
            value={projectConfig.projectId}
            onChange={handleItemData}
          />
        </FormControl>
      </InputContainer>

      {/* 둘째 줄 */}
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
            Project Name
          </InputLabel>
          <InputBox
            widthsize={"30rem"}
            fontsize={"1.4rem"}
            spacingsize={4}
            placeholder={`프로젝트 이름을 입력하세요.`}
            id="projectName"
            value={projectConfig.projectName}
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
            Project Description
          </InputLabel>
          <InputBox
            widthsize={"30rem"}
            fontsize={"1.4rem"}
            spacingsize={4}
            placeholder={`프로젝트 설명을 입력하세요.`}
            id="description"
            value={projectConfig.description}
            onChange={handleItemData}
          />
        </FormControl>
      </InputContainer>
      <ProjectContainer>{repoInfo}</ProjectContainer>
    </Container>
  );
}

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

const InputBox = mstyled(InputBase)<{
  widthsize: string;
  fontsize: string;
  spacingsize: number;
}>(({ theme, widthsize, fontsize, spacingsize }) => ({
  "label + &": {
    marginTop: theme.spacing(spacingsize),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: fontsize,
    width: widthsize,
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

const InputContainer = styled.div`
  width: 63%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
`;

const ProjectContainer = styled.div`
  width: 63%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
  background-color: ${theme.colors.container};
  border-radius: 1rem;
  padding: 1rem 2rem;
`;
