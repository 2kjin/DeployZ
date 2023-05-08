import styled from "styled-components";
import Header from "@components/common/Header";
import ItemListMain from "@components/item/ItemListMain";
import ProjectList from "@components/project/ProjectList";

export default function ProjectItemPage() {
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
  padding-top: 1.5rem;
`;
