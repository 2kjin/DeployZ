import React from "react";

//import css icons
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Icon } from "@iconify/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

//import components
import Header from "@components/common/Header";
import ItemBuildList from "./ItemBuildList";
import { ItemInfo } from "types/itemlist";

const itemInfoLists: ItemInfo[] = [
  // {
  //   idx: 1,
  //   itemName: "FE",
  //   frameworkType: "react",
  //   portNumber1: 3000,
  //   portNumber2: 3001,
  //   itemStates: "true",
  //   lastSuccessDate: "3days 17hr",
  //   lastFailedDate: "1days 5hr",
  // },
  {
    idx: 2,
    itemName: "BE",
    frameworkType: "springBoot",
    portNumber1: 8000,
    portNumber2: 8001,
    itemStates: "true",
    lastSuccessDate: "3days 17hr",
    lastFailedDate: "1days 5hr",
  },
  // {
  //   idx: 3,
  //   itemName: "DJANGO",
  //   frameworkType: "django",
  //   portNumber1: 9000,
  //   portNumber2: 9001,
  //   itemStates: "false",
  //   lastSuccessDate: "3days 17hr",
  //   lastFailedDate: "1days 5hr",
  // },
];

export default function ItemDetail() {
  return (
    <SWrap>
      <Header />
      {itemInfoLists.map((item) => (
        <SFrameMainDiv>
          <Icon
            icon="mdi:arrow-left-drop-circle-outline"
            fontSize="65"
            color="white"
            cursor="pointer"
          />
          <SFrame>
            <SFrameName>{item.itemName}</SFrameName>
            <SFrameImg>
              {item.frameworkType === "react" ? (
                <Icon icon="mdi:react" fontSize="250" color="white" />
              ) : item.frameworkType === "springBoot" ? (
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
      ))}
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
      {itemInfoLists.map((item) => (
        <SDetailDiv>
          <SDetailInfo>
            <SItemContainer>
              <SItem>포트번호</SItem>
              <SItemValue>
                {item.portNumber1} | {item.portNumber2}
              </SItemValue>
            </SItemContainer>
            <SItemContainer>
              <SItem>빌드 상태</SItem>
              <SItemStatus>
                {item.itemStates ? (
                  <CheckCircleOutlineIcon style={checkStyle} />
                ) : (
                  <HighlightOffIcon style={HighlightOffIconStyle} />
                )}
              </SItemStatus>
            </SItemContainer>
            <SItemContainer>
              <SItem>최근성공</SItem>
              <SItemValue>{item.lastSuccessDate}</SItemValue>
            </SItemContainer>
            <SItemContainer>
              <SItem>최근실패</SItem>
              <SItemValue>{item.lastFailedDate}</SItemValue>
            </SItemContainer>
          </SDetailInfo>
          <SBuildInfo>
            <SBuildList>
              <SBuildName>
                <Icon icon="material-symbols:cloud-upload" fontSize="55" color="#FEA51D" />
                <SP>빌드 내역</SP>
              </SBuildName>
              <ItemBuildList />
            </SBuildList>
            <SBuildContent></SBuildContent>
          </SBuildInfo>
        </SDetailDiv>
      ))}
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

const SBuildName = styled.div`
  display: flex;
  align-items: center;
`;

const SBuildContent = styled.div`
  width: 80%;
  height: 60rem;
  flex-shrink: 0;
`;

const SBuildList = styled.div`
  width: 20%;
  height: 60rem;
  flex-shrink: 0;
`;

const SBuildInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
  margin-left: 3rem;
  margin-top: 1rem;
  flex-shrink: 0;
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
  width: 170vh;
  background-color: ${theme.colors.white};
  border-radius: 5rem;
  margin: 5vh auto 5vh;
  display: flex;
  flex-direction: column;
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
