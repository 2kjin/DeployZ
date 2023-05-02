import { useNavigate } from "react-router-dom";

//import css
import styled from "styled-components";
import { theme } from "@/styles/theme";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { projectListInfo } from "@/types/project";

//!project?.name &&
//project 객체가 존재하지 않거나 name 프로퍼티가 비어있는 경우 true 반환
//모든 프로퍼티가 비어있다면 isProjectEmpty 변수에 true 할당

export default function ProjectListItem({ project }: { project: projectListInfo }): JSX.Element {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/project/detail/${project.idx}`);
  };

  return (
    <SProjectListItem>
      {project.isSuccess === "success" ? (
        <CheckCircleOutlineIcon style={checkStyle} />
      ) : (
        <HighlightOffIcon style={HighlightOffIconStyle} />
      )}
      <SProjectName>{project.projectName}</SProjectName>
      <SItemCount>{project.itemCnt}</SItemCount>
      <SLastSuccessDiv>
        <SLastSuccessTime>{project.lastSuccessDate}</SLastSuccessTime>
        <SContainerButton>{project.itemName}</SContainerButton>
      </SLastSuccessDiv>
      <SLastFailureDiv>
        <SLastFailureTime>{project.lastFailedDate}</SLastFailureTime>
        <SContainerButton>{project.itemName}</SContainerButton>
      </SLastFailureDiv>
      <SButton onClick={handleItemClick}>상세보기</SButton>
    </SProjectListItem>
  );
}

const HighlightOffIconStyle = {
  fontSize: "6rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "6rem",
  color: theme.colors.checkgreen,
};

const SLastSuccessDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* 자식 요소들을 수직 방향 가운데 정렬 */
`;

const SLastFailureDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* 자식 요소들을 수직 방향 가운데 정렬 */
`;

const SContainerButton = styled.button`
  border: none;
  border-radius: 1rem;
  background: ${theme.colors.darkgray};
  color: ${theme.colors.primary};
  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
  width: 6vh;
  height: 4vh;
  margin-left: 1rem;
  white-space: nowrap;
  overflow: hidden;
`;

const SProjectListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 15vh;
  background: ${theme.colors.lightgray};
  border-radius: 1rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding-right: 1rem;
  padding-left: 1rem;

  /* 추가된 CSS */
  flex-wrap: wrap;
  overflow: hidden;
`;

const SProjectName = styled.span`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  margin-right: 5rem;
`;

const SItemCount = styled.span`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  margin-left: 2rem;
`;

const SLastSuccessTime = styled.span`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
`;

const SLastFailureTime = styled.span`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
`;

const SButton = styled.button`
  border: 0.5rem solid ${theme.colors.secondary};
  border-radius: 5rem;
  background: ${theme.colors.secondary};
  color: ${theme.colors.white};
  font-size: 2rem;
  font-weight: ${theme.fontWeight.normal};
  cursor: pointer;
  width: 11vh;
  height: 5vh;
  margin-right: 1rem;
`;
