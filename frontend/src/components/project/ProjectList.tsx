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
  const [nowSelected, setNowSelected] = useState<number>(-1);

  const handleNowSelected = (value: number) => {
    setNowSelected(value);
  };

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

  if (visibleProjects.length < 3) {
    emptyDivCount = 3 - visibleProjects.length;
  } else if (visibleProjects.length === 3 && visibleProjects.length < 3) {
    emptyDivCount = 1;
  }

  return (
    <Container>
      {visibleProjects.map((project) => (
        <ProjectListItem
          key={project.idx}
          project={project}
          nowSelected={nowSelected}
          handleNowSelected={handleNowSelected}
        />
      ))}
      {Array.from({ length: emptyDivCount }).map((_, index) => (
        <SEmptyDiv key={index}>
          <AddCircleIcon
            onClick={handleEmptyClick}
            sx={{
              fontSize: "6rem",
              cursor: "pointer",
              color: theme.colors.primary,
              transition: "color 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.3s ease-in-out",
                color: "#3e4bbd",
              },
            }}
          />
        </SEmptyDiv>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 43vh;
  gap: 2rem;
`;

const SEmptyDiv = styled.div`
  width: 26vw;
  height: 36vh;
  background: ${theme.colors.lightgray};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  padding: 2em;
`;
