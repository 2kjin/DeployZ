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

  const handleEmptyClick = () => {
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

  let emptyDivCount = 0;

  if (result.length < 3) {
    emptyDivCount = 3 - result.length;
  } else if (result.length === 3 && visibleProjects.length < 3) {
    emptyDivCount = 1;
  }

  return (
    <Container>
      {visibleProjects.map((project) => (
        <ProjectListItem key={project.idx} project={project} />
      ))}
      {Array.from({ length: emptyDivCount }).map((_, index) => (
        <SEmptyDiv key={index}>
          <AddCircleIcon onClick={handleEmptyClick} style={styles} />
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
  height: 43vh;
`;

const SEmptyDiv = styled.div`
  width: 26vw;
  height: 37vh;
  background: ${theme.colors.lightgray};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  margin-right: 2rem;
  margin-left: 2rem;
  padding: 2rem;
`;
