import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

//import api
import { fetchItemDetail } from "../../api/itemApi";
import { changeTime } from "@/api/projectApi";

//import recoil
import { itemCountState } from "@/recoil/project";

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

  const itemCount = useRecoilValue(itemCountState);

  const handleNextClick = () => {
    const nextIdx = containerIdx + 1;
    if (nextIdx <= itemCount) {
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
          <SDiv>
            <SFrameMainDiv>
              <Icon
                icon="mdi:arrow-left-drop-circle-outline"
                fontSize="55"
                color="#F3F4F3"
                cursor="pointer"
                onClick={handlePrevClick}
              />
              <SFrame>
                <SFrameName>{itemDetail.itemName}</SFrameName>
                <SFrameImg>
                  {itemDetail.frameworkType === "React" ? (
                    <Icon icon="mdi:react" fontSize="130" color="#F3F4F3" />
                  ) : itemDetail.frameworkType === "SpringBoot" ? (
                    <Icon
                      icon="simple-icons:springboot"
                      fontSize="130"
                      color="#F3F4F3"
                    />
                  ) : (
                    <Icon
                      icon="tabler:brand-django"
                      fontSize="130"
                      color="#F3F4F3"
                    />
                  )}
                </SFrameImg>
              </SFrame>
              <Icon
                icon="mdi:arrow-right-drop-circle-outline"
                fontSize="55"
                color="#F3F4F3"
                cursor="pointer"
                onClick={handleNextClick}
              />
            </SFrameMainDiv>
          </SDiv>
          <SDiv>
            <SDetailContainer>
              <SNameDiv>
                <SItem>포트번호</SItem>
                <SItem>빌드 상태</SItem>
                <SItem>최근 성공</SItem>
                <SLastItem>최근 실패</SLastItem>
              </SNameDiv>
              <SDetailInfo>
                <SItemValue>{itemDetail.portNumber1}</SItemValue>
                <SItemStatus>
                  {itemDetail.status === "SUCCESS" ? (
                    <CheckCircleOutlineIcon style={checkStyle} />
                  ) : (
                    <HighlightOffIcon style={HighlightOffIconStyle} />
                  )}
                </SItemStatus>
                <SItemValue>
                  {changeTime(itemDetail.lastSuccessDate)}
                </SItemValue>
                <SItemValue>
                  {changeTime(itemDetail.lastFailureDate)}
                </SItemValue>
              </SDetailInfo>
              <ItemBuildList itemHistoryLists={itemDetail.buildHistories} />
            </SDetailContainer>
          </SDiv>
        </>
      )}
    </SWrap>
  );
}

const SDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SNameDiv = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const SDetailInfo = styled.div`
  display: flex;
  margin-top: 2rem;
  border-bottom: 2px solid ${theme.colors.darkgray};
  border-bottom-width: 0.2rem;
`;

const HighlightOffIconStyle = {
  fontSize: "3.5rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "3.5rem",
  color: theme.colors.checkgreen,
};

const SItemValue = styled.div`
  flex: 1;
  font-size: 1.9rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.secondary};
  text-align: center;
`;

const SItemStatus = styled.div`
  flex: 1;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
  text-align: center;
`;

const SItem = styled.div`
  flex: 1;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
  text-align: center;
  border-right: 2px solid ${theme.colors.darkgray};
  border-bottom-width: 0.3rem;
`;

const SLastItem = styled.div`
  flex: 1;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
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
  width: 150vh;
  padding-bottom: 5em;
  padding-top: 5em;
`;

const SFrameName = styled.span`
  font-size: 4.5em;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.lightgray};
  margin-bottom: 0.3em;
  text-shadow: 0 0 4px ${theme.colors.white};
`;

const SFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SWrap = styled.div`
  height: 130vh;
  background: linear-gradient(140deg, #151649 32.5%, #f3f4f3);
`;

const SDetailContainer = styled.div`
  width: 150vh;
  height: 70vh;
  background-color: ${theme.colors.lightgray};
  border-radius: 0.8rem;
  border: 0.1rem solid ${theme.colors.darkgray};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;
