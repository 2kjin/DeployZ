import { useState, useEffect } from "react";
import styled, { ThemedStyledProps, DefaultTheme } from "styled-components";
import { theme } from "@/styles/theme";
import { itemHistory } from "@/types/item";
import { changeBuildTime } from "@/api/itemApi";

//import css icons
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Icon } from "@iconify/react";

interface SBuildItemProps {
  key: number;
  onClick: () => void;
  selected: boolean;
}

export default function ItemBuildList({
  itemHistoryLists,
}: {
  itemHistoryLists: itemHistory[];
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const selectedItem = selectedIdx
    ? itemHistoryLists.find((item) => item.idx === selectedIdx)
    : null;

  useEffect(() => {
    setSelectedIdx(selectedItem);
  }, [selectedItem]);

  return (
    <SDetailBuild>
      <SBuildList>
        <SBuildName>
          <Icon
            icon="material-symbols:cloud-upload"
            fontSize="55"
            color="#FEA51D"
          />
          <SP>빌드 내역</SP>
        </SBuildName>
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
      </SBuildList>
      <SBuildMessage>
        <SBuildName>
          <SP>콘솔 출력</SP>
          {selectedItem && <SStatusP># {selectedItem.idx}</SStatusP>}
        </SBuildName>
        <SBuildMessageContent>
          {selectedItem ? selectedItem.consol : selectedItem.consol}
        </SBuildMessageContent>
      </SBuildMessage>
    </SDetailBuild>
  );
}

const SStatusP = styled.span`
  font-size: 2.9em;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.secondary};
  margin-left: 1em;
`;

const SBuildMessageContent = styled.div`
  font-size: 2em;
  padding: 2em;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
  background-color: ${theme.colors.lightgray};
  border-radius: 0.2em;
  height: 50vh;
  overflow-y: scroll;
`;

const SP = styled.span`
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-left: 0.5em;
`;

const SBuildName = styled.div``;

const SBuildMessage = styled.div`
  height: 53vh;
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
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  overflow-y: scroll;
`;

const SBuildItem = styled.div<ThemedStyledProps<SBuildItemProps, DefaultTheme>>`
  display: flex;
  flex-direction: column;
  text-align: start;
  border-bottom: 2px solid ${theme.colors.darkgray};

  & > div {
    background-color: ${(props) => (props.selected ? "#FEA51D" : "#FFFFFF")};
    border-radius: 1rem; /* 둥글게 만들기 */
  }
`;

const SBuildStatus = styled.span`
  font-size: 2.5rem;
`;

const SBuildRegisterTime = styled.span`
  font-size: 2.5rem;
`;
