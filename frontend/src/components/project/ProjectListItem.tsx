import React from "react";

//import css
import styled from "styled-components";
import { theme } from "@/styles/theme";

//import images
import check from "../../assets/img/check.png";
import plusbotton from "../../assets/img/plusbotton.png";

export interface ProjectListItemProps {
  id: number;
  name: string;
  itemCount: number;
  lastSuccessTime: string;
  lastFailureTime: string;
  containerName: string;
}

export default function ProjectListItem({
  id,
  name,
  itemCount,
  lastSuccessTime,
  lastFailureTime,
  containerName,
}: ProjectListItemProps): JSX.Element {
  return (
    <SProjectListItem>
      <SImg src={check} />
      <SProjectName>{name}</SProjectName>
      <SItemCount>{itemCount}</SItemCount>
      <SLastSuccessDiv>
        <SLastSuccessTime>{lastSuccessTime}</SLastSuccessTime>
        <SContainerButton>{containerName}</SContainerButton>
      </SLastSuccessDiv>
      <SLastFailureDiv>
        <SLastFailureTime>{lastFailureTime}</SLastFailureTime>
        <SContainerButton>{containerName}</SContainerButton>
      </SLastFailureDiv>
      <SButton>상세보기</SButton>
    </SProjectListItem>
  );
}

const SLastSuccessDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* 자식 요소들을 수직 방향 가운데 정렬 */
`;

const SLastFailureDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* 자식 요소들을 수직 방향 가운데 정렬 */
`;

const SContainerButton = styled.button`
  border: none;
  border-radius: 1rem;
  background: ${theme.colors.darkgray};
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.normal};
  width: 12vh;
  height: 4vh;
  margin-left: 1rem;
  white-space: nowrap;
  overflow: hidden;
`;

const SImg = styled.img`
  width: 4vh;
  height: 4vh;
  margin-left: 1rem;
`;

const SProjectListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 10vh;
  background: ${theme.colors.lightgray};
  border-radius: 1rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const SProjectName = styled.span`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  margin-right: 5rem;
`;

const SItemCount = styled.span`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  margin-left: 5rem;
`;

const SLastSuccessTime = styled.span`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
`;

const SLastFailureTime = styled.span`
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
`;

const SButton = styled.button`
  border: 0.5rem solid ${theme.colors.secondary};
  border-radius: 5rem;
  background: ${theme.colors.secondary};
  color: ${theme.colors.white};
  font-size: 2rem;
  font-weight: ${theme.fontWeight.normal};
  cursor: pointer;
  width: 11vh;
  height: 5vh;
  margin-right: 1rem;
`;
