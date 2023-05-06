import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { fetchProjectList } from "../../api/projectApi";

import ProjectListItem from "./ProjectListItem";
import { projectListInfo } from "@/types/project";

export default function ProjectList() {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/step`);
  };
  const [result, setResult] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState<projectListInfo[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const {
          data: { result },
        } = await fetchProjectList();
        setVisibleProjects(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProjects();
  }, [result]);

  return (
    <Container>
      {visibleProjects.map((project) => (
        <ProjectListItem key={project.idx} project={project} />
      ))}
      {result.length <= 2 && visibleProjects.length < 3 && (
        <SEmptyDiv onClick={handleItemClick}>
          <AddCircleIcon style={styles} />
        </SEmptyDiv>
      )}
    </Container>
  );
}

const styles = {
  fontSize: "6rem",
  cursor: "pointer",
  color: theme.colors.primary,
};

const Container = styled.div`
  height: 45vh;
`;

const SEmptyDiv = styled.div`
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
