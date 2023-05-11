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
      <SItem>
        <StopIcon style={StopIconStyle} />
      </SItem>
      <SItem>{item.name}</SItem>
      <SItem>
        {item.status === "SUCCESS" ? (
          <CheckCircleOutlineIcon style={checkStyle} />
        ) : (
          <HighlightOffIcon style={HighlightOffIconStyle} />
        )}
      </SItem>
      <SSItem>
        {item.portNumber1} , {item.portNumber2}
      </SSItem>
      <STimeItem>{changeTime(item.lastSuccessDate)}</STimeItem>
      <STimeItem>{changeTime(item.lastFailureDate)}</STimeItem>
      <SItem>
        <SButton onClick={handleItemClick}>상세보기</SButton>
      </SItem>
    </SItemList>
  );
}

const SButtonItem = styled.div`
  flex: 1;
`;

const SSItem = styled.div`
  flex: 2;
  font-size: 2.3em;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
`;

const STimeItem = styled.div`
  flex: 2;
  font-size: 2.3em;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
`;

const SItem = styled.div`
  flex: 1.5;
  font-size: 2.3rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80vw;
  height: 8vh;
  padding: 1em;
  background: ${theme.colors.lightgray};
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 1.5em;
`;
