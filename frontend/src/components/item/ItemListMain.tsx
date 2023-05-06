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

const Container = styled.div`
  height: 48vh;
`;

const SItem = styled.div`
  flex: 2;
  font-size: 2.8rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
`;

const SDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;
`;

const SEditButton = styled.button`
  border: 0.5rem solid ${theme.colors.secondary};
  border-radius: 5rem;
  background: ${theme.colors.secondary};
  color: ${theme.colors.white};
  font-size: 2.1rem;
  font-weight: ${theme.fontWeight.bold};
  cursor: pointer;
  padding: 1rem 1.5rem;
  margin-left: 3rem;
`;

const STitleBox = styled.div`
  width: 80vw;
  height: 15vh;
  background-color: ${theme.colors.white};
  border-radius: 2rem;
  margin: 2vh auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const STitle = styled.span`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.extraBold};
  font-size: 4.5rem;
  padding-left: 6rem;
`;

const SListBox = styled.div`
  width: 90vw;
  height: 45vh;
  background-color: ${theme.colors.white};
  border-radius: 1rem;
  margin;
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

const SImg = styled.img`
  width: 13vh;
  height: 4vh;
`;
