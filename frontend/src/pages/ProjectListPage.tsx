import React from "react";

//import components
import ProjectList from "@components/project/ProjectList";
import Header from "@components/common/Header";

//import css
import styled from "styled-components";

export default function ProjectListPage() {
  return (
    <>
      <Header />
      <STitleBox>
        <STitle>프로젝트 목록</STitle>
      </STitleBox>
      <SProjectList></SProjectList>
    </>
  );
}

const SProjectName = styled.div`
  flex-direction: row;
`;

const STitleBox = styled.div`
  width: 75vw;
  height: 15vh;
  background-color: white;
  border-radius: 3rem;
  margin: 2vh auto;
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

const SProjectList = styled.div`
  width: 75vw;
  height: 70vh;
  background-color: white;
  border-radius: 3rem;
  margin: 3vh auto;
  display: flex;
`;
