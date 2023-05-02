import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//import api
import { fetchItemDetail } from "../../api/itemApi";

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
  // Header type 설정
  const [type, setType] = useState<string>("standard");
  const [selectedMessage, setSelectedMessage] = useState("");

  const handleItemClick = (message: string) => {
    setSelectedMessage(message);
  };

  const { idx } = useParams<{ idx: string }>();
  const containerIdx = parseInt(idx as string, 10);

  const [itemDetail, setItemDetail] = useState<itemDetailInfo | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItemDetail(containerIdx);
      setItemDetail(data);
    };
    fetchData();
  }, []);

  return (
    <SWrap>
      <Header type={type} />
      {itemDetail && (
        <>
          <SFrameMainDiv>
            <Icon
              icon="mdi:arrow-left-drop-circle-outline"
              fontSize="65"
              color="white"
              cursor="pointer"
            />
            <SFrame>
              <SFrameName>{itemDetail.itemName}</SFrameName>
              <SFrameImg>
                {itemDetail.frameworkType === "react" ? (
                  <Icon icon="mdi:react" fontSize="250" color="white" />
                ) : itemDetail.frameworkType === "springBoot" ? (
                  <Icon icon="simple-icons:springboot" fontSize="250" color="white" />
                ) : (
                  <Icon icon="tabler:brand-django" fontSize="250" color="white" />
                )}
              </SFrameImg>
            </SFrame>
            <Icon
              icon="mdi:arrow-right-drop-circle-outline"
              fontSize="65"
              color="white"
              cursor="pointer"
            />
          </SFrameMainDiv>
          <SCentered>
            <SRadioLabel htmlFor="one">
              <Icon icon="mdi:number-one-circle-outline" fontSize="70" />
              <SSpan>빌드</SSpan>
            </SRadioLabel>
            <SLine />
            <SRadioLabel htmlFor="two">
              <Icon icon="mdi:number-two-circle-outline" fontSize="70" />
              <SSpan>배포</SSpan>
            </SRadioLabel>
            <SLine />
            <SRadioLabel htmlFor="three">
              <Icon icon="mdi:number-three-circle-outline" fontSize="70" />
              <SSpan>실행</SSpan>
            </SRadioLabel>
          </SCentered>
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
                  {itemDetail.itemStates ? (
                    <CheckCircleOutlineIcon style={checkStyle} />
                  ) : (
                    <HighlightOffIcon style={HighlightOffIconStyle} />
                  )}
                </SItemStatus>
              </SItemContainer>
              <SItemContainer>
                <SItem>최근성공</SItem>
                <SItemValue>{itemDetail.lastSuccessDate}</SItemValue>
              </SItemContainer>
              <SItemContainer>
                <SItem>최근실패</SItem>
                <SItemValue>{itemDetail.lastFailedDate}</SItemValue>
              </SItemContainer>
            </SDetailInfo>
            <ItemBuildList itemHistoryLists={itemDetail.itemHistories} />
          </SDetailDiv>
        </>
      )}
    </SWrap>
  );
}

const HighlightOffIconStyle = {
  fontSize: "4rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "4rem",
  color: theme.colors.checkgreen,
};

const SItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SItemValue = styled.span`
  font-size: 2.2rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.secondary};
  margin-top: 3.5rem;
`;

const SItemStatus = styled.span`
  margin-top: 1.5rem;
`;

const SP = styled.p`
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-left: 1rem;
`;

const SDetailInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  margin: 4rem auto 0;
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
  padding-right: 2rem;
  padding-left: 2rem;
`;

const SFrameName = styled.span`
  font-size: 5rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.container};
  margin-bottom: 1rem;
`;

const SFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SSpan = styled.span`
  font-size: 2.5rem;
  margin-top: 0.5rem;
`;

const SWrap = styled.div`
  width: 100%;
  height: 135rem;
  background: linear-gradient(140deg, #151649 32.5%, #f3f4f3);
`;

const SDetailDiv = styled.div`
  width: 150vh;
  height: 80vh;
  background-color: ${theme.colors.white};
  border-radius: 5rem;
  margin: 5vh auto 5vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const SCentered = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const SRadioLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: ${theme.colors.white};
  font-size: 2.5rem;
`;

const SLine = styled.div`
  width: 40rem;
  margin-bottom: 2rem;
  border: 0.5vh solid ${theme.colors.white};
`;
