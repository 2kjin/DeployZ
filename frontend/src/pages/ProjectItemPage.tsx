import { useEffect } from "react";

import styled from "styled-components";
import Header from "@components/common/Header";
import ItemListMain from "@components/item/ItemListMain";
import ProjectList from "@components/project/ProjectList";

export default function ProjectItemPage() {
  //처음 들어왔을 때 새로고침해주기
  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  return (
    <>
      <Header type="standard" />
      <SWrap>
        <ProjectList />
        <ItemListMain />
      </SWrap>
    </>
  );
}

const SWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 93vh;

`;
