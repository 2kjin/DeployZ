import { useSetRecoilState } from "recoil";
import { useState } from "react";
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
}: {
  project: projectListInfo;
}) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

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

  const setProjectIdx = useSetRecoilState(projectIdxState);

  const handleProjectClick = () => {
    setIsSelected(!isSelected);
    setProjectIdx(project.idx);
  };

  return (
    <SProjectList isSelected={isSelected} onClick={handleProjectClick}>
      <STitleDiv>
        <STitle>{project.projectName}</STitle>
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
      <SDesc>프로젝트 설명 : {project.description}</SDesc>
      <SChartDiv>
        <BuildChart branches={project.branches} />
      </SChartDiv>
      <STimeContainer>
        <STimeDiv>
          <SSItem>최근 빌드 성공</SSItem>
          <STimeItem>{changeTime(project.lastSuccessDate)}</STimeItem>
        </STimeDiv>
        <STimeDiv>
          <SSItem>최근 빌드 실패</SSItem>
          <STimeItem>{changeTime(project.lastFailureDate)}</STimeItem>
        </STimeDiv>
      </STimeContainer>
    </SProjectList>
  );
}

const DeleteOutlineIconStyle = {
  fontSize: "6rem",
  cursor: "pointer",
  color: theme.colors.error,
  marginLeft: "auto",
};

const STimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5rem;
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
  gap: 1rem;
  margin-left: 2rem;
`;

const STitle = styled.div`
  font-size: 5rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
`;

const SSItem = styled.span`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
`;

const STimeItem = styled.div`
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
  margin-top: 0.5rem;
`;

const SDesc = styled.div`
  font-size: 2.2rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
  margin-left: 2rem;
  margin-top: 1rem;
`;

const SProjectList = styled.div<{ isSelected: boolean }>`
  width: 26vw;
  height: 36vh;
  background: ${({ isSelected }) =>
    isSelected ? theme.colors.secondary : theme.colors.lightgray};
  border-radius: 1rem;
  margin-right: 2rem;
  margin-left: 2rem;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease-in-out;
    background-color: ${theme.colors.complete};
  }
`;

const HighlightOffIconStyle = {
  fontSize: "5rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "5rem",
  color: theme.colors.checkgreen,
};
