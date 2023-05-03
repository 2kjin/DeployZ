import { useState } from "react";
import ProjectList from "@components/project/ProjectList";
import Header from "@components/common/Header";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function ProjectListPage(): JSX.Element {
  // Header type 설정
  const [type, setType] = useState<string>("standard");
  return (
    <>
      <Header type={type} />
      <STitleBox>
        <STitle>프로젝트 목록</STitle>
      </STitleBox>
      <SProjectList>
        <SProjectName>
          <SItem></SItem>
          <SItem>프로젝트 명</SItem>
          <SItem>아이템 수</SItem>
          <SItem>최근 빌드 성공</SItem>
          <SItem>최근 빌드 실패</SItem>
          <SItem></SItem>
        </SProjectName>
        <ProjectList />
      </SProjectList>
    </>
  );
}

const SProjectName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 78vw;
  height: 12vh;
`;
const SItem = styled.div`
  flex: 2;
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-right: 3rem;
`;

const STitleBox = styled.div`
  width: 80vw;
  height: 13vh;
  background-color: ${theme.colors.white};
  border-radius: 2rem;
  margin: 2.5vh auto;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const STitle = styled.span`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.bold};
  font-size: 4.5rem;
  padding-left: 6rem;
`;

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
