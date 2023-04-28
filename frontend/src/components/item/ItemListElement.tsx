import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/styles/theme";

//import mui icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { ItemInfo } from "../../../types/itemlist";

interface ItemListElementProps {
  item: ItemInfo;
}

export default function ItemListElement({ item }: ItemListElementProps) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/itemdetail/${item.idx}`);
  };

  return (
    <>
      <SItem>
        <PlayArrowIcon style={PlayArrowIconStyle} />
        <StopIcon style={StopIconStyle} />
        <SProjectName>{item.itemName}</SProjectName>
        {item.itemStates ? (
          <CheckCircleOutlineIcon style={checkStyle} />
        ) : (
          <HighlightOffIcon style={HighlightOffIconStyle} />
        )}
        <SItemCount>{item.portNumber1}</SItemCount>
        <SItemCount>{item.portNumber2}</SItemCount>
        <SLastSuccessTime>{item.lastSuccessDate}</SLastSuccessTime>
        <SLastFailureTime>{item.lastFailedDate}</SLastFailureTime>
        <DeleteOutlineIcon style={DeleteOutlineIconStyle} />
        <SButton onClick={handleItemClick}>상세보기</SButton>
      </SItem>
    </>
  );
}

const PlayArrowIconStyle = {
  fontSize: "5rem",
  cursor: "pointer",
  color: theme.colors.checkgreen,
};

const StopIconStyle = {
  fontSize: "5rem",
  cursor: "pointer",
  color: theme.colors.error,
};
const DeleteOutlineIconStyle = {
  fontSize: "5rem",
  cursor: "pointer",
  color: theme.colors.error,
};

const HighlightOffIconStyle = {
  fontSize: "5rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "5rem",
  color: theme.colors.checkgreen,
};

const SButton = styled.button`
  border: 0.5rem solid ${theme.colors.secondary};
  border-radius: 5rem;
  background: ${theme.colors.secondary};
  color: ${theme.colors.white};
  font-size: 2rem;
  font-weight: ${theme.fontWeight.normal};
  cursor: pointer;
  width: 11vh;
  height: 5vh;
  margin-right: 1rem;
`;

const SItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 10vh;
  background: ${theme.colors.lightgray};
  border-radius: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-right: 1rem;
  padding-left: 1rem;
`;

const SProjectName = styled.span`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
`;

const SItemCount = styled.span`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
`;

const SLastSuccessTime = styled.span`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
`;

const SLastFailureTime = styled.span`
  font-size: 2rem;
  font-weight: ${theme.fontWeight.bold};
`;
