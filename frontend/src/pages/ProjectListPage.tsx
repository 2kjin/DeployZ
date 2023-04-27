import React from "react";
import ProjectList from "@components/project/ProjectList";
import Header from "@components/common/Header";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function ProjectListPage(): JSX.Element {
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
        <ProjectList />
      </SProjectList>
    </>
  );
}

const SProjectName = styled.div`
  width: 66%;
  height: 10%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding-right: 10rem;
`;
const SItem = styled.span`
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.extrabold};
  color: ${theme.colors.primary};
`;

const STitleBox = styled.div`
  width: 80vw;
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
  width: 80vw;
  height: 70vh;
  background-color: ${theme.colors.white};
  border-radius: 3rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
