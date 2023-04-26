import React from "react";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

//import images
import check from "../../assets/img/check.png";
import plusbotton from "../../assets/img/plusbotton.png";

export interface Project {
  id: string;
  name: string;
  itemCount: number;
  lastSuccessTime: string;
  lastFailureTime: string;
}

export default function ProjectListItem({
  name,
  itemCount,
  lastSuccessTime,
  lastFailureTime,
}: Project) {
  return (
    <>
      <SProjectListItem>
        <Checkbox />
        <SProjectName>{name}</SProjectName>
        <SItemCount>{itemCount}</SItemCount>
        <SLastSuccessTime>{lastSuccessTime}</SLastSuccessTime>
        <SLastFailureTime>{lastFailureTime}</SLastFailureTime>
        <SButton variant="contained">상세보기</SButton>
      </SProjectListItem>
    </>
  );
}

const SProjectListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5vh;
  padding: 0 3vw;
`;

const SProjectName = styled.p`
  font-size: 1.5rem;
  width: 20%;
`;

const SItemCount = styled.p`
  font-size: 1.5rem;
  width: 10%;
`;

const SLastSuccessTime = styled.p`
  font-size: 1.5rem;
  width: 30%;
`;

const SLastFailureTime = styled.p`
  font-size: 1.5rem;
  width: 30%;
`;

const SButton = styled(Button)`
  height: 3.5vh;
`;
