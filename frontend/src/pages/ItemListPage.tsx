import React from "react";
import { Grid } from "@material-ui/core";

//import components
import Header from "@components/common/Header";
import ItemList from "@components/item/ItemList";

//import css
import styled from "styled-components";

//import images
import mainLogo from "../assets/img/main-logo.png";

export default function ItemListPage() {
  return (
    <>
      <Header />
      <SWrapper>
        <STitleBox>
          <SEditButton>설정</SEditButton>
          <SDiv>
            <SImg src={mainLogo} />
            <STitle>프로젝트 이름</STitle>
          </SDiv>
        </STitleBox>
        <SListBox>
          <SListTitleDiv>
            <Grid item xs={2}>
              <SListTitle>이름</SListTitle>
            </Grid>
            <Grid item xs={2}>
              <SListTitle>상태</SListTitle>
            </Grid>
            <Grid item xs={3}>
              <SListTitle>포트</SListTitle>
            </Grid>
            <Grid item xs={2}>
              <SListTitle>최근 성공</SListTitle>
            </Grid>
            <Grid item xs={2}>
              <SListTitle>최근 실패</SListTitle>
            </Grid>
          </SListTitleDiv>
          <ItemList />
        </SListBox>
      </SWrapper>
    </>
  );
}

const SDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SEditButton = styled.button`
  border: 2px solid #fea51d;
  border-radius: 5rem;
  background: #fea51d;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 9vh;
  height: 5vh;
  margin-left: 3vw;
  &:hover {
    background-color: #ffd51d;
    border-color: #ffd51d;
  }
`;

const STitleBox = styled.div`
  width: 70vw;
  height: 15vh;
  background-color: white;
  border-radius: 2rem;
  margin: 3vh auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const STitle = styled.p`
  color: black;
  font-size: 5.5rem;
  font-weight: bold;
  margin-right: 4vh;
`;

const SListBox = styled.div`
  width: 70vw;
  height: 65vh;
  background-color: white;
  border-radius: 2rem;
  margin: auto;
  overflow: auto;
`;

const SListTitle = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
`;

const SListTitleDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 16vh;
  margin-top: 1vh;
  margin-bottom: 2vh;
  max-width: 45vw;
  justify-content: space-between;
`;

const SWrapper = styled.div`
  height: 80vh;
`;

const SImg = styled.img`
  width: 13vh;
  height: 5vh;
  margin-right: 3vh;
`;
