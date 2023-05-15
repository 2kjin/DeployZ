import { useState, useEffect } from "react";
import styled, { ThemedStyledProps, DefaultTheme } from "styled-components";
import { theme } from "@/styles/theme";
import { itemHistory } from "@/types/item";
import { changeBuildTime } from "@/api/itemApi";

//import css icons
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Icon } from "@iconify/react";

export default function ItemBuildList({
  itemHistoryLists,
}: {
  itemHistoryLists: itemHistory[];
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<itemHistory | null>(null);
  const buildMessage: string[] = selectedItem?.consol.split("\n");

  //선택된 것이 없다면 item의idx와 같은selectedIdx를 찾기
  useEffect(() => {
    if (selectedIdx !== null) {
      setSelectedItem(
        itemHistoryLists?.find((item) => item.idx === selectedIdx) || null
      );
    }
  }, [selectedIdx, itemHistoryLists]);

  //BUILD 가 NULL일때
  if (!itemHistoryLists) {
    return <SEmptyBuildContent>빌드 목록이 없습니다 📃</SEmptyBuildContent>;
  }

  return (
    <SDetailBuild>
      <SBuildList>
        <SBuildName>
          <Icon
            icon="material-symbols:cloud-upload"
            fontSize="35"
            color="#FEA51D"
          />
          <SP>빌드 내역</SP>
        </SBuildName>
        <SBuildListContainer>
          {itemHistoryLists.map((item) => (
            <SBuildItem
              key={item.idx}
              onClick={() => setSelectedIdx(item.idx)}
              selected={selectedIdx === item.idx}
            >
              <SBuildTitle>
                <SBuildStatus># {item.idx}</SBuildStatus>
                <SBuildState>
                  {item.status === "SUCCESS" ? (
                    <CheckCircleOutlineIcon style={checkStyle} />
                  ) : (
                    <HighlightOffIcon style={HighlightOffIconStyle} />
                  )}
                </SBuildState>
              </SBuildTitle>
              <SBuildRegisterTime>
                {changeBuildTime(item.registerDate)}
              </SBuildRegisterTime>
            </SBuildItem>
          ))}
        </SBuildListContainer>
      </SBuildList>
      <>
        {selectedItem === null ? (
          <SEmptyMessageContent>
            빌드내역을 클릭하시면 콘솔 확인이 가능해요 📃
          </SEmptyMessageContent>
        ) : (
          <SBuildMessage>
            {selectedIdx !== null && (
              <div>
                <SBuildName>
                  <SP>콘솔 출력</SP>
                  {selectedItem && <SStatusP># {selectedItem.idx}</SStatusP>}
                </SBuildName>
                <SBuildMessageContent>
                  {buildMessage.map((log, idx) => (
                    <p key={idx}>{log}</p>
                  ))}
                </SBuildMessageContent>
              </div>
            )}
          </SBuildMessage>
        )}
      </>
    </SDetailBuild>
  );
}

const SEmptyBuildContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  background-color: ${theme.colors.white};
  border-radius: 0.5rem;
  height: 55vh;
  width: 80vw;
`;

const SEmptyMessageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  border: 1px solid #d2d8df44;
  background-color: ${theme.colors.white};
  border-radius: 0.2rem;
  height: 47vh;
  width: 60vw;
`;

const SBuildListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const SBuildItem = styled.div<{ selected: boolean }>`
  text-align: start;
  border-bottom: 2px solid ${theme.colors.darkgray};
  background-color: ${(props) => (props.selected ? "#FEA51D" : "")};
  color: ${(props) => (props.selected ? "#ffffff" : "black")};
  cursor: pointer;
  padding: 1rem;

  :hover {
    background-color: ${theme.colors.pending};
    color: black;
  }
`;

const SStatusP = styled.span`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.secondary};
  margin-left: 0.8rem;
`;

const SBuildMessageContent = styled.div`
  font-size: 2rem;
  padding: 1rem;
  margin: 0 1rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
  background-color: ${theme.colors.container};
  border-radius: 1rem;
  height: 40vh;
  overflow-x: hidden;
  word-break: break-all;
`;

const SP = styled.p`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-left: 0.3rem;
`;

const SBuildName = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const SBuildMessage = styled.div`
  width: 80%;
`;

const SDetailBuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const SBuildTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const SBuildState = styled.div`
  margin-left: 1rem;
`;

const HighlightOffIconStyle = {
  fontSize: "2.5rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "2.5rem",
  color: theme.colors.checkgreen,
};

const SBuildList = styled.div`
  width: 20%;
  height: 51vh;
  flex-direction: column;
  overflow-y: scroll;
`;

const SBuildStatus = styled.span`
  font-size: 1.9rem;
  padding: 0.1rem;
`;

const SBuildRegisterTime = styled.span`
  font-size: 1.9rem;
  padding: 0.1em;
`;
