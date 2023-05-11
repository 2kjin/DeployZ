import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { projectIdxState } from "@/recoil/project";

import ItemList from "@components/item/ItemList";
import { projectDetailInfo } from "@/types/project";
import { fetchProjectDetail } from "@/api/projectApi";

//import css
import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function ItemListMain() {
  const projectIdx = useRecoilValue(projectIdxState);
  const [projectDetail, setProjectDetail] = useState<projectDetailInfo[]>();

  useEffect(() => {
    if (projectIdx === 0) {
    } else {
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
    }
  }, [projectIdx]);

  return (
    <>
      {projectIdx === 0 ? (
        <SEmptyListBox>
          프로젝트를 클릭하시면 아이템들이 보여요 📃
        </SEmptyListBox>
      ) : (
        <SListBox>
          <SListTitleDiv>
            <SItem></SItem>
            <SItem></SItem>
            <SItem>이름</SItem>
            <SItem>상태</SItem>
            <SSItem>포트</SSItem>
            <SSItem>최근 성공</SSItem>
            <SSItem>최근 실패</SSItem>
            <SItem></SItem>
          </SListTitleDiv>
          <SListContent>
            <ItemList projectDetail={projectDetail} />
          </SListContent>
        </SListBox>
      )}
    </>
  );
}

const SEmptyListBox = styled.div`
  width: 81vw;
  height: 34vh;
  background-color: ${theme.colors.white};
  font-weight: ${theme.fontWeight.bold};
  font-size: 5em;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1em;
`;

const SItem = styled.div`
  flex: 2;
  font-size: 2.6em;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
`;

const SSItem = styled.div`
  flex: 3.2;
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
`;

const SListContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SListBox = styled.div`
  width: 85vw;
  height: 43vh;
  background-color: ${theme.colors.white};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1em;
`;

const SListTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80vw;
  height: 8vh;
`;
