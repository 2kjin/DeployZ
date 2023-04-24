import React from "react";

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
          <SImg src={mainLogo} />
          <STitle>프로젝트 이름</STitle>
        </STitleBox>
        <SListBox>
          <SListTitleDiv>
            <SListTitle>이름</SListTitle>
            <SListTitle>상태</SListTitle>
            <SListTitle>포트</SListTitle>
            <SListTitle>최근 성공</SListTitle>
            <SListTitle>최근 실패</SListTitle>
          </SListTitleDiv>
          <ItemList />
        </SListBox>
      </SWrapper>
    </>
  );
}

const SEditButton = styled.button`
  border: 2px solid #fea51d;
  border-radius: 50px;
  background: #fea51d;
  color: white;
  font-size: 20px;
  cursor: pointer;
  width: 100px;
  height: 50px;
`;

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

const SImg = styled.img`
  width: 150px;
  height: 47px;
`;
