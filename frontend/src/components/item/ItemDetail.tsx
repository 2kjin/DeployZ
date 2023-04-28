import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

//import components
import Header from "@components/common/Header";

import { ItemInfo } from "../../../types/itemlist";

export default function ItemDetail() {
  return (
    <SWrap>
      <Header />
      <SDetailDiv></SDetailDiv>
    </SWrap>
  );
}

const SWrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(140deg, #151649 50%, #f3f4f3);
`;

const SDetailDiv = styled.div`
  width: 80vw;
  height: 15vh;
  background-color: ${theme.colors.white};
  border-radius: 2rem;
  margin: 2vh auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
