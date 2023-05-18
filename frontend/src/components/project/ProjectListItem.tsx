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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
  const [deleteButtonHover, setDeleteButtonHover] = useState<boolean>(false);

  const handleDeleteButtonOn = () => {
    setDeleteButtonHover(true);
  };

  const handleDeleteButtonOff = () => {
    setDeleteButtonHover(false);
  };

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
        <STitleDiv>
          <STitle isSelected={isSelected}>{project.projectName}</STitle>
          {project.status === "SUCCESS" && (
            <CheckCircleOutlineIcon style={checkStyle} />
          )}
          {(project.status === "FAIL" || project.status === null) && (
            <HighlightOffIcon style={HighlightOffIconStyle} />
          )}
        </STitleDiv>
        <div
          onMouseOver={handleDeleteButtonOn}
          onMouseOut={handleDeleteButtonOff}
        >
          {deleteButtonHover && (
            <DeleteForeverIcon
              style={DeleteOutlineIconStyle}
              onClick={handleDeleteClick}
            />
          )}
          {!deleteButtonHover && (
            <DeleteOutlineIcon style={DeleteOutlineIconStyle} />
          )}
        </div>
      </STitleDiv>
      <SDesc isSelected={isSelected}>{project.description}</SDesc>
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
  fontSize: "4rem",
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
  padding-top: 0.5rem;
`;

const SChartDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const STitle = styled.div<{ isSelected: boolean }>`
  font-size: 2.8rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${({ isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.primary};
  display: inline-block;
  white-space: nowrap;
`;

const SSItem = styled.span<{ isSelected: boolean }>`
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${({ isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.primary};
`;

const STimeItem = styled.div<{ isSelected: boolean }>`
  font-size: 1.9rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${({ isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.primary};
  margin-top: 0.4rem;
`;

const SDesc = styled.div<{ isSelected: boolean }>`
  font-size: 1.6rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${({ isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.primary};
  margin-top: 0.3rem;
  margin-left: 0.3rem;
`;

const SProjectList = styled.div<{ isSelected: boolean }>`
  width: 24vw;
  height: 36vh;
  background: ${({ isSelected }) =>
    isSelected ? theme.colors.secondary : theme.colors.white};
  border-radius: 1rem;
  /* padding: 1rem 2rem; */
  padding: 0.5vw 1vw;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease-in-out;
  }
`;

const HighlightOffIconStyle = {
  fontSize: "4rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "4rem",
  color: theme.colors.checkgreen,
};
