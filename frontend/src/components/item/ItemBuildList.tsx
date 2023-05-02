import { useState } from "react";
import styled, { ThemedStyledProps, DefaultTheme } from "styled-components";
import { theme } from "@/styles/theme";
import { itemHistory } from "@/types/item";

//import css icons
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Icon } from "@iconify/react";

interface SBuildItemProps {
  key: number;
  onClick: () => void;
  selected: boolean;
  // 기존의 props에 추가될 selected prop
}

export default function ItemBuildList({
  itemHistoryLists,
}: {
  itemHistoryLists: itemHistory[];
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

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
              <SBuildStatus>{item.status}</SBuildStatus>
              <SBuildState>
                {item.state === "success" ? (
                  <CheckCircleOutlineIcon style={checkStyle} />
                ) : (
                  <HighlightOffIcon style={HighlightOffIconStyle} />
                )}
              </SBuildState>
            </SBuildTitle>
            <SBuildRegisterTime>{item.registerTime}</SBuildRegisterTime>
          </SBuildItem>
        ))}
      </SBuildList>
      <SBuildMessage>
        <SBuildName>
          <SP>콘솔 출력</SP>
          <SStatusP>
            {itemHistoryLists.find((item) => item.idx === selectedIdx)?.status}
          </SStatusP>
        </SBuildName>
        <SBuildMessageContent>
          {itemHistoryLists.find((item) => item.idx === selectedIdx)?.message}
        </SBuildMessageContent>
      </SBuildMessage>
    </SDetailBuild>
  );
}
const SStatusP = styled.span`
  font-size: 2.8rem;
  font-weight: ${theme.fontWeight.extraBold};
  color: ${theme.colors.primary};
  margin-left: 1.5rem;
`;

const SBuildMessageContent = styled.div`
  font-size: 2rem;
  padding: 2rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
  background-color: ${theme.colors.lightgray};
  border-radius: 3rem;
  height: 80%;
  overflow-y: scroll;
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

const SBuildMessage = styled.div`
  height: 50vh;
  width: 80%;
  margin-left: 4rem;
`;

const SDetailBuild = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 3rem;
  margin-left: 3rem;
  margin-top: 2rem;
  flex-shrink: 0;
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
  height: 50vh;
  width: 20%;
  overflow-y: scroll;
  margin-top: 10px;
  cursor: pointer;
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
