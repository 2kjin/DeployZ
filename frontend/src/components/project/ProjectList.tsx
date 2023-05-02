import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { fetchProjectList } from "../../api/projectApi";

import ProjectListItem from "./ProjectListItem";
import { projectListInfo } from "@/types/project";

export default function ProjectList(): JSX.Element {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/step`);
  };
  const [status, setStatus] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState<projectListInfo[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await fetchProjectList();
      if (status <= 2) {
        setVisibleProjects(projects.slice(0, 3));
      } else {
        setVisibleProjects(projects);
      }
    }
    fetchProjects();
  }, [status]);

  return (
    <>
      {visibleProjects.map((project) => (
        <ProjectListItem key={project.idx} project={project} />
      ))}
      {status <= 2 && visibleProjects.length < 3 && (
        <SEmptyDiv onClick={handleItemClick}>
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
  width: 78vw;
  height: 15vh;
  background: ${theme.colors.lightgray};
  overflow: hidden;
  margin: auto;
  border-radius: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;
