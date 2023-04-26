import React from "react";

//import components
import ProjectList from "@components/project/ProjectList";
import Header from "@components/common/Header";

//import css
import styled from "styled-components";
import { theme } from "@/styles/theme";

const projectData = [
  {
    id: 1,
    name: "DeployZ",
    itemCount: 3,
    lastSuccessTime: "3days 11hr",
    lastFailureTime: "4days 2hr",
  },
  {
    id: 2,
    name: "Actopus",
    itemCount: 4,
    lastSuccessTime: "1days 11hr",
    lastFailureTime: "2days 5hr",
  },
  //...
];

export default function ProjectListPage() {
  return (
    <>
      <Header />
      <STitleBox>
        <STitle>프로젝트 목록</STitle>
      </STitleBox>
      <SProjectList>
        <SProjectName>
          <SItem>프로젝트 명</SItem>
          <SItem>아이템 수</SItem>
          <SItem>최근 빌드 성공</SItem>
          <SItem>최근 빌드 실패</SItem>
        </SProjectName>
        <ProjectList projects={projectData} />
      </SProjectList>
    </>
  );
}
const SProjectName = styled.div`
  width: 60%;
  height: 10%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

const SItem = styled.span`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.primary};
`;

const STitleBox = styled.div`
  width: 75vw;
  height: 15vh;
  background-color: ${theme.colors.white};
  border-radius: 3rem;
  margin: 2vh auto;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const STitle = styled.span`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.extrabold};
  font-size: 5.5rem;
  margin-left: 3vh;
`;

const SProjectList = styled.div`
  width: 75vw;
  height: 70vh;
  background-color: ${theme.colors.white};
  border-radius: 3rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
