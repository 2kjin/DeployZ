import React from "react";

//import components
import ProjectList from "@components/project/ProjectList";

//import css
import styled from "styled-components";

export default function ProjectListPage() {
  return (
    <>
      <SWrapper>
        <STitleBox>
          <STitle>프로젝트 목록</STitle>
        </STitleBox>
        <SListBox>
          <SListTitleDiv>
            <SListTitle>프로젝트 명</SListTitle>
            <SListTitle>아이템 수</SListTitle>
            <SListTitle>최근 빌드 성공</SListTitle>
            <SListTitle>최근 빌드 실패</SListTitle>
          </SListTitleDiv>
          <ProjectList />
        </SListBox>
      </SWrapper>
    </>
  );
}

const STitleBox = styled.div`
  width: 70vw;
  height: 18vh;
  background-color: white;
  border-radius: 20px;
  margin: 3vh auto 3vh;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const STitle = styled.p`
  color: black;
  font-size: 5.5rem;
  font-weight: bold;
  margin-left: 3vh;
`;

const SListBox = styled.div`
  width: 70vw;
  height: 65vh;
  background-color: white;
  border-radius: 20px;
  margin: 0px auto 3vh;
  padding-top: 1vh;
  overflow: auto;
`;

const SListTitle = styled.p`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
`;

const SListTitleDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 15%;
  margin-top: 3vh;
  margin-bottom: 5vh;
  max-width: 50vw;
`;

const SWrapper = styled.div`
  margin-top: 8vh;
`;
