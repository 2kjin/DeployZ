import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/styles/theme";

//import mui icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { projectDetailInfo } from "@/types/project";
import { changeTime } from "@/api/projectApi";

export default function ItemListElement({ item }: { item: projectDetailInfo }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/item/detail/${item.idx}`);
  };

  return (
    <SItemList>
      <SButtonItem>
        <PlayArrowIcon style={PlayArrowIconStyle} />
      </SButtonItem>
      <SButtonItem>
        <StopIcon style={StopIconStyle} />
      </SButtonItem>
      <SNameItem>{item.name}</SNameItem>
      <SStatusItem>
        {item.status === "SUCCESS" ? (
          <CheckCircleOutlineIcon style={checkStyle} />
        ) : (
          <HighlightOffIcon style={HighlightOffIconStyle} />
        )}
      </SStatusItem>
      <SPortItem>{item.portNumber}</SPortItem>
      <SSuccessItem>{changeTime(item.lastSuccessDate)}</SSuccessItem>
      <SFailItem>{changeTime(item.lastFailureDate)}</SFailItem>
      <SItem>
        <SButton onClick={handleItemClick}>상세보기</SButton>
      </SItem>
    </SItemList>
  );
}

const SFailItem = styled.div`
  flex: 2;
  font-size: 1.8rem;
`;

const SSuccessItem = styled.div`
  flex: 2;
  font-size: 1.8rem;
`;

const SPortItem = styled.div`
  flex: 1;
  font-size: 1.8rem;
`;

const SStatusItem = styled.div`
  flex: 0.8;
  font-size: 1.8rem;
`;

const SNameItem = styled.div`
  flex: 2;
  font-size: 1.8rem;
`;

const SButtonItem = styled.div`
  flex: 0.8;
`;

const SItem = styled.div`
  flex: 0.8;
`;

const PlayArrowIconStyle = {
  fontSize: "4rem",
  cursor: "pointer",
  color: theme.colors.checkgreen,
};

const StopIconStyle = {
  fontSize: "4rem",
  cursor: "pointer",
  color: theme.colors.error,
};

const HighlightOffIconStyle = {
  fontSize: "4rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "4rem",
  color: theme.colors.checkgreen,
};

const SButton = styled.button`
  border: 0.5rem solid ${theme.colors.secondary};
  border-radius: 5rem;
  background: ${theme.colors.secondary};
  color: ${theme.colors.white};
  font-size: 1.6rem;
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  padding: 0.8rem 1.2rem;
  :hover {
    transform: scale(1.03);
    transition: all 0.2s ease-out;
  }
`;

const SItemList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 170vh;
  height: 5.5vh;
  padding: 1rem;
  background: ${theme.colors.lightgray};
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 1.5em;
`;
