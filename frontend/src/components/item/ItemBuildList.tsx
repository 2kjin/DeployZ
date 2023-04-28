import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { itemHistory } from "../../../types/itemlist";

const itemHistorylists: itemHistory[] = [
  {
    idx: 1,
    status: "#123",
    message: "콘솔콘솔콘솔",
    registerTime: "23.04.19 11:04:23",
  },
  {
    idx: 2,
    status: "#123",
    message: "콘솔콘솔콘솔",
    registerTime: "23.04.19 11:04:23",
  },
  {
    idx: 3,
    status: "#123",
    message: "콘솔콘솔콘솔",
    registerTime: "23.04.19 11:04:23",
  },
];

export default function ItemBuildList() {
  return (
    <SBuildList>
      {itemHistorylists.map((item) => (
        <SBuildItem key={item.idx}>
          <SBuildStatus>{item.status}</SBuildStatus>
          <SBuildRegisterTime>{item.registerTime}</SBuildRegisterTime>
        </SBuildItem>
      ))}
    </SBuildList>
  );
}

const SBuildList = styled.div`
  height: 50vh;
  overflow-y: scroll;
  margin-top: 10px;
`;

const SBuildItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  height: 5.5rem;
  border-bottom: 2px solid ${theme.colors.darkgray};
`;

const SBuildStatus = styled.span`
  font-size: 2.5rem;
`;

const SBuildRegisterTime = styled.span`
  font-size: 2.5rem;
`;
