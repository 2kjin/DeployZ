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
            <SButtonItem></SButtonItem>
            <SButtonItem></SButtonItem>
            <SNameItem>이름</SNameItem>
            <SStatusItem>상태</SStatusItem>
            <SPortItem>포트</SPortItem>
            <SSuccessItem>최근 성공</SSuccessItem>
            <SFailItem>최근 실패</SFailItem>
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

const SFailItem = styled.div`
  flex: 2;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
`;

const SSuccessItem = styled.div`
  flex: 2;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
`;

const SPortItem = styled.div`
  flex: 1;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
`;

const SStatusItem = styled.div`
  flex: 0.8;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
`;

const SNameItem = styled.div`
  flex: 2;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
`;

const SButtonItem = styled.div`
  flex: 0.8;
`;

const SEmptyListBox = styled.div`
  width: 169vh;
  height: 36vh;
  background-color: ${theme.colors.white};
  font-weight: ${theme.fontWeight.bold};
  font-size: 3.8rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2.5rem;
`;

const SListBox = styled.div`
  width: 169vh;
  height: 36vh;
  background-color: ${theme.colors.white};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 2.5rem;
`;

const SItem = styled.div`
  flex: 0.8;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
`;

const SListContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SListTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 170vh;
  height: 6vh;
`;
