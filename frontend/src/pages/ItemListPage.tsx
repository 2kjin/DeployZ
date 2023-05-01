import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "@components/common/Header";
import ItemList from "@components/item/ItemList";
import { fetchProjectDetail } from "../api/projectApi";
import { projectDetailInfo } from "@/types/project";
//import css
import styled from "styled-components";
import { theme } from "@/styles/theme";

//import images
import logo from "../assets/logo.png";

export default function ItemListPage() {
  const { idx } = useParams<{ idx: string }>();
  const projectIdx = parseInt(idx as string, 10);
  const [projectDetail, setProjectDetail] = useState<projectDetailInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detail = await fetchProjectDetail(projectIdx);
        console.log(detail);
        setProjectDetail(detail);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [projectIdx]);

  if (!projectDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <STitleBox>
        <SEditButton>설정</SEditButton>
        <SDiv>
          <SImg src={logo} />
          {projectDetail && <STitle>{projectDetail.projectName}</STitle>}
        </SDiv>
      </STitleBox>
      <SListBox>
        <SListTitleDiv>
          <SItem>이름</SItem>
          <SItem>상태</SItem>
          <SItem>포트</SItem>
          <SItem>최근 성공</SItem>
          <SItem>최근 실패</SItem>
        </SListTitleDiv>
        {projectDetail && <ItemList itemList={projectDetail.itemList} />}
      </SListBox>
    </>
  );
}
const SItem = styled.span`
  font-size: 2.2rem;
  font-weight: ${theme.fontWeight.extrabold};
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
  font-size: 2rem;
  font-weight: ${theme.fontWeight.normal};
  cursor: pointer;
  width: 11vh;
  height: 5vh;
  margin-left: 2rem;
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
  font-weight: ${theme.fontWeight.extrabold};
  font-size: 5.5rem;
  margin-left: 1vh;
`;

const SListBox = styled.div`
  width: 80vw;
  height: 70vh;
  background-color: ${theme.colors.white};
  border-radius: 3rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const SListTitleDiv = styled.div`
  width: 51%;
  height: 10%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding-right: 10rem;
  margin-top: 1.5rem;
`;

const SImg = styled.img`
  width: 12vh;
  height: 4vh;
  margin-right: 3vh;
`;
