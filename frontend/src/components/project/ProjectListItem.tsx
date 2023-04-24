import React from "react";

import styled from "styled-components";

//import images
import check from "../../assets/img/check.png";
import x from "../../assets/img/x.png";
import plusbotton from "../../assets/img/plusbotton.png";

export default function ProjectListItem() {
  return (
    <>
      <SListBox>
        <SListContentDiv>
          <SImg src={check} />
          <SImg src={x} />
          <SProjectName>DeployZ</SProjectName>
          <SItemCnt>3</SItemCnt>
          <SBuildSuccess>3days</SBuildSuccess>
          <SBuildFail>3days</SBuildFail>
          <SButton>상세보기</SButton>
        </SListContentDiv>
      </SListBox>
      <SListBox>
        <SListContentDiv>
          <SImg src={plusbotton} />
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

const SImg = styled.img`
  width: 38px;
  height: 38px;
`;

const SButton = styled.button`
  border: 2px solid #fea51d;
  border-radius: 50px;
  background: #fea51d;
  color: white;
  font-size: 20px;
  cursor: pointer;
  width: 100px;
  height: 50px;
`;
