import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ItemList from "@components/item/ItemList";
import { projectDetailInfo } from "@/types/project";
import { fetchProjectDetail } from "@/api/projectApi";

//import css
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function ItemListMain() {
  // Header type 설정
  const { idx } = useParams<{ idx: string }>();
  const projectIdx = parseInt(idx as string, 10);
  const [projectDetail, setProjectDetail] = useState<projectDetailInfo[]>();

  useEffect(() => {
    async function fetchItems(projectIdx: number) {
      try {
        const {
          data: { result },
        } = await fetchProjectDetail(projectIdx);
        setProjectDetail(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchItems(projectIdx);
  }, [projectIdx]);

  return (
    <SListBox>
      <SListTitleDiv>
        <SItem></SItem>
        <SItem></SItem>
        <SItem>이름</SItem>
        <SItem>상태</SItem>
        <SItem>포트</SItem>
        <SItem>최근 성공</SItem>
        <SItem>최근 실패</SItem>
        <SItem></SItem>
        <SItem></SItem>
      </SListTitleDiv>
      <ItemList />
    </SListBox>
  );
}

const SItem = styled.div`
  flex: 2;
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
`;

const SListBox = styled.div`
  width: 89vw;
  height: 43vh;
  background-color: ${theme.colors.white};
  border-radius: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SListTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 78vw;
  height: 12vh;
`;
