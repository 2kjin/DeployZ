import React from "react";

import styled from "styled-components";

//import img
import start from "../../assets/img/start.png";
import stop from "../../assets/img/stop.png";
import trash from "../../assets/img/trash.png";
import check from "../../assets/img/check.png";
import x from "../../assets/img/x.png";

export default function ItemListElement() {
  return (
    <>
      <SListBox>
        <SListContentDiv>
          <SImg src={start} />
          <SImg src={stop} />
          <SItemName>FE</SItemName>
          <SItemStatus>
            <SImg src={check} />
            <SImg src={x} />
          </SItemStatus>
          <SItemPort>3000, 3001</SItemPort>
          <SItemSuccess>3 days</SItemSuccess>
          <SItemFail>3 days</SItemFail>
          <SImg src={trash} />
          <SButton>상세보기</SButton>
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
  overflow: hidden;
`;

const SImg = styled.img`
  flex: 1;
  text-align: center;
  width: 38px;
  height: 38px;
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

const SItemName = styled.p`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  color: black;
`;

const SItemStatus = styled.p`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  color: black;
`;

const SItemPort = styled.p`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  color: black;
`;

const SItemSuccess = styled.p`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  color: black;
`;

const SItemFail = styled.p`
  flex: 1;
  text-align: center;
  font-size: 2rem;
  color: black;
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
