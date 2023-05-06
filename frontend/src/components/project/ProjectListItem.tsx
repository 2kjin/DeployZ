import { useNavigate } from "react-router-dom";

//import css
import styled from "styled-components";
import { theme } from "@/styles/theme";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { projectListInfo } from "@/types/project";
import { changeTime } from "@/api/projectApi";

export default function ProjectListItem({
  project,
}: {
  project: projectListInfo;
}) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/project/detail/${project.idx}`);
  };

  return (
    <SProjectList>
      <SDiv>
        <SItem>
          {project.status === "SUCCESS" ? (
            <CheckCircleOutlineIcon style={checkStyle} />
          ) : (
            <HighlightOffIcon style={HighlightOffIconStyle} />
          )}
        </SItem>
        <SItem>{project.projectName}</SItem>
        <SItem>{project.itemCnt}</SItem>
        <STimeItem>
          {changeTime(project.lastSuccessDate)}
          <SContainerButton>{project.itemName}</SContainerButton>
        </STimeItem>
        <STimeItem>
          {changeTime(project.lastFailureDate)}
          <SContainerButton>{project.itemName}</SContainerButton>
        </STimeItem>
        <SItem>
          <SButton onClick={handleItemClick}>상세보기</SButton>
        </SItem>
      </SDiv>
    </SProjectList>
  );
}

const STimeItem = styled.div`
  flex: 2;
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
`;

const SItem = styled.div`
  flex: 2;
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
`;

const SDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SProjectList = styled.div`
  display: flex;
  width: 30vw;
  height: 45vh;
  background: ${theme.colors.lightgray};
  overflow: hidden;
  margin: auto;
  border-radius: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;

const HighlightOffIconStyle = {
  fontSize: "5rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "5rem",
  color: theme.colors.checkgreen,
};

const SContainerButton = styled.button`
  border: none;
  border-radius: 0.5rem;
  background: ${theme.colors.darkgray};
  color: ${theme.colors.primary};
  font-size: 1.7rem;
  font-weight: ${theme.fontWeight.medium};
  width: 6vh;
  height: 3vh;
  margin-left: 1rem;
  overflow: hidden;
`;

const SButton = styled.button`
  border: 0.5rem solid ${theme.colors.secondary};
  border-radius: 5rem;
  background: ${theme.colors.secondary};
  color: ${theme.colors.white};
  font-size: 2rem;
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  padding: 0.8rem 1.5rem;
`;
