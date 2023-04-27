import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import ProjectListItem from "./ProjectListItem";
import { ProjectInfo } from "../../../types/projectlist";
import { style } from "@mui/system";

//더미데이터
const projects: ProjectInfo[] = [
  {
    idx: 1,
    projectName: "DeployZ",
    itemCnt: 3,
    lastSuccessDate: "3days 11hr",
    lastFailedDate: "4days 2hr",
    itemName: "#FE",
    isIng: "",
  },
  {
    idx: 2,
    projectName: "Actopus",
    itemCnt: 4,
    lastSuccessDate: "1days 11hr",
    lastFailedDate: "2days 5hr",
    itemName: "#BE",
    isIng: "true",
  },
  {
    idx: 2,
    projectName: "Actopus",
    itemCnt: 4,
    lastSuccessDate: "1days 11hr",
    lastFailedDate: "2days 5hr",
    itemName: "#BE",
    isIng: "true",
  },
];

export default function ProjectList(): JSX.Element {
  const [status, setStatus] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState<ProjectInfo[]>([]);

  useEffect(() => {
    if (status <= 2) {
      setVisibleProjects(projects.slice(0, 3));
    } else {
      setVisibleProjects(projects);
    }
  }, [status]);

  return (
    <>
      {visibleProjects.map((project) => (
        <ProjectListItem key={project.idx} project={project} />
      ))}
      {status <= 2 && visibleProjects.length < 3 && (
        <SEmptyDiv>
          <AddCircleIcon style={styles} />
        </SEmptyDiv>
      )}
    </>
  );
}

const styles = {
  fontSize: "6rem",
  cursor: "pointer",
  color: theme.colors.primary,
};

const SEmptyDiv = styled.div`
  display: flex;
  justify-content: center; /* 가로 방향 가운데 정렬 */
  align-items: center; /* 세로 방향 가운데 정렬 */
  width: 95%;
  height: 15vh;
  background: ${theme.colors.lightgray};
  border-radius: 1rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding-right: 1rem;
  padding-left: 1rem;
`;
