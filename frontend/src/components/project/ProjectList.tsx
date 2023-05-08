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

  const emptyDivCount =
    result.length === 0
      ? 3
      : (result.length === 1 || result.length === 2) &&
        visibleProjects.length < 3
      ? 3 - visibleProjects.length
      : 0;

  return (
    <Container>
      {visibleProjects.map((project) => (
        <ProjectListItem key={project.idx} project={project} />
      ))}
      {emptyDivCount > 0 &&
        Array.from({ length: emptyDivCount }).map((_, index) => (
          <SEmptyDiv key={index} onClick={handleItemClick}>
            <AddCircleIcon style={styles} />
          </SEmptyDiv>
        ))}
    </Container>
  );
}

const styles = {
  fontSize: "6rem",
  cursor: "pointer",
  color: theme.colors.primary,
};

const Container = styled.div`
  display: flex;
  height: 45vh;
`;

const SEmptyDiv = styled.div`
  width: 29vw;
  height: 40vh;
  background: ${theme.colors.lightgray};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;
