import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//import api
import { fetchItemDetail } from "../../api/itemApi";
import { changeTime } from "@/api/projectApi";

//import css icons
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Icon } from "@iconify/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

//import components
import Header from "@components/common/Header";
import ItemBuildList from "./ItemBuildList";

//import type
import { itemDetailInfo } from "@/types/item";

export default function ItemDetail() {
  const { idx } = useParams<{ idx: string }>();
  const initialContainerIdx = parseInt(idx as string, 10);
  const [containerIdx, setContainerIdx] = useState<number>(initialContainerIdx);
  const [itemDetail, setItemDetail] = useState<itemDetailInfo | null>(null);

  const navigate = useNavigate();

  const handlePrevClick = () => {
    const prevIdx = containerIdx - 1;
    if (prevIdx > 0) {
      navigate(`/item/detail/${prevIdx}`);
    }
  };

  //아이템 디테일 이동 가능한 idx 임시로 5로 지정
  //수정해야함
  const handleNextClick = () => {
    const nextIdx = containerIdx + 1;
    if (nextIdx <= 5) {
      navigate(`/item/detail/${nextIdx}`);
    }
  };

  useEffect(() => {
    setContainerIdx(initialContainerIdx);
  }, [initialContainerIdx]);

  useEffect(() => {
    async function fetchDetail(containerIdx: number) {
      try {
        const {
          data: { result },
        } = await fetchItemDetail(containerIdx);
        setItemDetail(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDetail(containerIdx);
  }, [containerIdx]);

  return (
    <SWrap>
      <Header type="standard" />
      {itemDetail && (
        <>
          <SFrameMainDiv>
            <Icon
              icon="mdi:arrow-left-drop-circle-outline"
              fontSize="65"
              color="#F3F4F3"
              cursor="pointer"
              onClick={handlePrevClick}
            />
            <SFrame>
              <SFrameName>{itemDetail.itemName}</SFrameName>
              <SFrameImg>
                {itemDetail.frameworkType === "React" ? (
                  <Icon icon="mdi:react" fontSize="240" color="#F3F4F3" />
                ) : itemDetail.frameworkType === "SpringBoot" ? (
                  <Icon
                    icon="simple-icons:springboot"
                    fontSize="240"
                    color="#F3F4F3"
                  />
                ) : (
                  <Icon
                    icon="tabler:brand-django"
                    fontSize="240"
                    color="#F3F4F3"
                  />
                )}
              </SFrameImg>
            </SFrame>
            <Icon
              icon="mdi:arrow-right-drop-circle-outline"
              fontSize="65"
              color="#F3F4F3"
              cursor="pointer"
              onClick={handleNextClick}
            />
          </SFrameMainDiv>
          <SDetailContainer>
            <SDetailDiv>
              <SDetailInfo>
                <SItemContainer>
                  <SItem>포트번호</SItem>
                  <SItemValue>
                    {itemDetail.portNumber1} | {itemDetail.portNumber2}
                  </SItemValue>
                </SItemContainer>
                <SItemContainer>
                  <SItem>빌드 상태</SItem>
                  <SItemStatus>
                    {itemDetail.status === "SUCCESS" ? (
                      <CheckCircleOutlineIcon style={checkStyle} />
                    ) : (
                      <HighlightOffIcon style={HighlightOffIconStyle} />
                    )}
                  </SItemStatus>
                </SItemContainer>
                <SItemContainer>
                  <SItem>최근 성공</SItem>
                  <SItemValue>
                    {changeTime(itemDetail.lastSuccessDate)}
                  </SItemValue>
                </SItemContainer>
                <SItemContainer>
                  <SItem>최근 실패</SItem>
                  <SItemValue>
                    {changeTime(itemDetail.lastFailureDate)}
                  </SItemValue>
                </SItemContainer>
              </SDetailInfo>
              <ItemBuildList itemHistoryLists={itemDetail.buildHistories} />
            </SDetailDiv>
          </SDetailContainer>
        </>
      )}
    </SWrap>
  );
}

const HighlightOffIconStyle = {
  fontSize: "4.5rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "4.5rem",
  color: theme.colors.checkgreen,
};

const SItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SItemValue = styled.div`
  font-size: 2.2rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-top: 2em;
`;

const SItemStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5em;
`;

const SDetailInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20em;
`;

const SItem = styled.span`
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  flex: 1;
  text-align: center;
`;

const SFrameImg = styled.div`
  margin-bottom: 1rem;
`;

const SFrameMainDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
`;

const SFrameName = styled.span`
  font-size: 5em;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.lightgray};
  margin-bottom: 0.3em;
`;

const SFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SWrap = styled.div`
  height: 120vh;
  background: linear-gradient(140deg, #151649 32.5%, #f3f4f3);
`;

const SDetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SDetailDiv = styled.div`
  width: 150vh;
  height: 70vh;
  background-color: ${theme.colors.lightgray};
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
