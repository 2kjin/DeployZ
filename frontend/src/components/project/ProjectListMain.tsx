import ProjectList from "@components/project/ProjectList";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function ProjectListMain() {
  return (
    <>
      <SProjectList>
        <ProjectList />
      </SProjectList>
    </>
  );
}

const SProjectList = styled.div`
  width: 80vw;
  height: 70vh;
  background-color: ${theme.colors.white};
  border-radius: 2rem;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
