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

  //선택된 것이 없다면 item의idx와 같은selectedIdx를 찾기
  useEffect(() => {
    if (selectedIdx !== null) {
      setSelectedItem(
        itemHistoryLists.find((item) => item.idx === selectedIdx)
      );
    }
  }, [selectedIdx]);

  return (
    <SDetailBuild>
      <SBuildList>
        <SBuildName>
          <Icon
            icon="material-symbols:cloud-upload"
            fontSize="50"
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
      <SBuildMessage>
        {selectedIdx !== null && (
          <div>
            <SBuildName>
              <SP>콘솔 출력</SP>
              {selectedItem && <SStatusP># {selectedItem.idx}</SStatusP>}
            </SBuildName>
            <SBuildMessageContent>
              {selectedItem ? selectedItem.consol : ""}
            </SBuildMessageContent>
          </div>
        )}
      </SBuildMessage>
    </SDetailBuild>
  );
}

const SBuildListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const SBuildItem = styled.div<{ selected: boolean }>`
  flex: 5;
  text-align: start;
  border-bottom: 2px solid ${theme.colors.darkgray};
  background-color: ${(props) => (props.selected ? "#FEA51D" : "")};
  color: ${(props) => (props.selected ? "#ffffff" : "black")};
  cursor: pointer;
  padding: 0.3em;

  :hover {
    background-color: ${theme.colors.pending};
  }
`;

const SStatusP = styled.span`
  font-size: 2.9em;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.secondary};
  margin-left: 0.5em;
`;

const SBuildMessageContent = styled.div`
  font-size: 2em;
  padding: 0.8em;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
  border: 1px solid #73798044;
  background-color: ${theme.colors.lightgray};
  border-radius: 0.2em;
  height: 40vh;
  overflow-y: scroll;
`;

const SP = styled.p`
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-left: 0.3em;
`;

const SBuildName = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const SBuildMessage = styled.div`
  height: 48vh;
  width: 80%;
`;

const SDetailBuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 140vh;
  height: 50vh;
  padding: 1em;
  gap: 2em;
`;

const SBuildTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const SBuildState = styled.div`
  margin-left: 1rem;
`;

const HighlightOffIconStyle = {
  fontSize: "3rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "3rem",
  color: theme.colors.checkgreen,
};

const SBuildList = styled.div`
  height: 48vh;
  width: 20%;
  flex-direction: column;
  overflow-y: scroll;
`;

const SBuildStatus = styled.span`
  font-size: 2.3rem;
  padding: 0.1em;
`;

const SBuildRegisterTime = styled.span`
  font-size: 2.3rem;
  padding: 0.1em;
`;
