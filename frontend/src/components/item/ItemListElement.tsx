import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/styles/theme";

//import mui icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { itemListInfo } from "@/types/item";

export default function ItemListElement({ item }: { item: itemListInfo }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/item/detail/${item.idx}`);
  };

  return (
    <SItemList>
      <SDiv>
        <SItem>
          <PlayArrowIcon style={PlayArrowIconStyle} />
        </SItem>
        <SItem>
          <StopIcon style={StopIconStyle} />
        </SItem>
        <SItem>{item.itemName}</SItem>
        <SItem>
          {item.status === "success" ? (
            <CheckCircleOutlineIcon style={checkStyle} />
          ) : (
            <HighlightOffIcon style={HighlightOffIconStyle} />
          )}
        </SItem>
        <SItem>
          {item.portNumber1} , {item.portNumber2}
        </SItem>
        <SItem>{item.lastSuccessDate}</SItem>
        <SItem>{item.lastFailedDate}</SItem>
        <SItem>
          <DeleteOutlineIcon style={DeleteOutlineIconStyle} />
        </SItem>
        <SItem>
          <SButton onClick={handleItemClick}>상세보기</SButton>
        </SItem>
      </SDiv>
    </SItemList>
  );
}

const SItem = styled.div`
  flex: 2;
  font-size: 2.3rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
  margin-right: 3rem;
`;

const SDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PlayArrowIconStyle = {
  fontSize: "6rem",
  cursor: "pointer",
  color: theme.colors.checkgreen,
};

const StopIconStyle = {
  fontSize: "6rem",
  cursor: "pointer",
  color: theme.colors.error,
};
const DeleteOutlineIconStyle = {
  fontSize: "6rem",
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
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  padding: 0.8rem 1.5rem;
`;

const SItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 75vw;
  height: 12vh;
  background: ${theme.colors.lightgray};
  overflow: hidden;
  margin: auto;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
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
