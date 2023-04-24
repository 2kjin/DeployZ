import React from "react";

import styled from "styled-components";

export default function ProjectListItem() {
  return (
    <>
      <SListBox>
        <SListContentDiv>
          <SProjectName>DeployZ</SProjectName>
          <SItemCnt>3</SItemCnt>
          <SBuildSuccess>3days</SBuildSuccess>
          <SBuildFail>3days</SBuildFail>
        </SListContentDiv>
      </SListBox>
    </>
  );
}

const SListBox = styled.div`
  width: 65vw;
  height: 12vh;
  background: #f3f4f3;
  border: 1px solid black;
  border-radius: 10px;
  margin: 3vh auto 3vh;
  display: flex;
`;

const SProjectName = styled.p`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  color: black;
`;

const SItemCnt = styled.p`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  color: black;
`;

const SBuildSuccess = styled.p`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  color: black;
`;

const SBuildFail = styled.p`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  color: black;
`;

const SListContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 15%;
  margin-top: 3vh;
  margin-bottom: 5vh;
  max-width: 50vw;
`;
