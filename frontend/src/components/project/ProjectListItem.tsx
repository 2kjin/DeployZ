import { useSetRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { projectIdxState } from "@/recoil/project";
import { projectDelete } from "@/api/projectApi";
//import css
import styled from "styled-components";
import { theme } from "@/styles/theme";

//import icons
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

//import components and api
import { projectListInfo } from "@/types/project";
import { changeTime } from "@/api/projectApi";
import BuildChart from "./Chart/BuildChart";

export default function ProjectListItem({
  project,
  nowSelected,
  handleNowSelected,
}: {
  project: projectListInfo;
  nowSelected: number;
  handleNowSelected: (value: number) => void;
}) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const setProjectIdx = useSetRecoilState(projectIdxState);

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      try {
        await projectDelete(project.idx);
        alert("삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error("아이템 삭제 실패", error);
        alert("아이템 삭제에 실패했습니다.");
      }
    }
  };

  const handleProjectClick = () => {
    setProjectIdx(project.idx);
    handleNowSelected(project.idx);
  };

  useEffect(() => {
    if (nowSelected === project.idx) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [nowSelected, project.idx]);

  return (
    <SProjectList isSelected={isSelected} onClick={handleProjectClick}>
      <STitleDiv>
        <STitle isSelected={isSelected}>{project.projectName}</STitle>
        {project.status === "SUCCESS" ? (
          <CheckCircleOutlineIcon style={checkStyle} />
        ) : (
          <HighlightOffIcon style={HighlightOffIconStyle} />
        )}
        <DeleteOutlineIcon
          style={DeleteOutlineIconStyle}
          onClick={handleDeleteClick}
        />
      </STitleDiv>
      <SDesc isSelected={isSelected}>
        프로젝트 설명 : {project.description}
      </SDesc>
      <SChartDiv>
        <BuildChart branches={project.branches} />
      </SChartDiv>
      <STimeContainer>
        <STimeDiv>
          <SSItem isSelected={isSelected}>최근 빌드 성공</SSItem>
          <STimeItem isSelected={isSelected}>
            {changeTime(project.lastSuccessDate)}
          </STimeItem>
        </STimeDiv>
        <STimeDiv>
          <SSItem isSelected={isSelected}>최근 빌드 실패</SSItem>
          <STimeItem isSelected={isSelected}>
            {changeTime(project.lastFailureDate)}
          </STimeItem>
        </STimeDiv>
      </STimeContainer>
    </SProjectList>
  );
}

const DeleteOutlineIconStyle = {
  fontSize: "4em",
  cursor: "pointer",
  color: theme.colors.error,
  marginLeft: "auto",
};

const STimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5em;
`;

const STimeDiv = styled.div`
  flex: 1;
`;

const SChartDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  margin-left: 2em;
`;

const STitle = styled.div<{ isSelected: boolean }>`
  font-size: 4.3em;
  font-weight: ${theme.fontWeight.bold};
  color: ${({ isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.primary};
`;

const SSItem = styled.span<{ isSelected: boolean }>`
  font-size: 2em;
  font-weight: ${theme.fontWeight.bold};
  color: ${({ isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.primary};
`;

const STimeItem = styled.div<{ isSelected: boolean }>`
  font-size: 2.5em;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${({ isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.primary};
  margin-top: 0.5em;
`;

const SDesc = styled.div<{ isSelected: boolean }>`
  font-size: 2.2em;
  font-weight: ${theme.fontWeight.medium};
  color: ${({ isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.primary};
  margin-left: 1em;
  margin-top: 0.5em;
`;

const SProjectList = styled.div<{ isSelected: boolean }>`
  width: 26vw;
  height: 36vh;
  background: ${({ isSelected }) =>
    isSelected ? theme.colors.secondary : theme.colors.lightgray};
  border-radius: 1rem;
  padding: 2em;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease-in-out;
  }
`;

const HighlightOffIconStyle = {
  fontSize: "4em",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "4em",
  color: theme.colors.checkgreen,
};
