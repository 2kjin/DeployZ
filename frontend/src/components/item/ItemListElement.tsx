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
import { itemDelete } from "@/api/itemApi";
import { changeTime } from "@/api/projectApi";

export default function ItemListElement({ item }: { item: itemListInfo }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/item/detail/${item.idx}`);
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      try {
        await itemDelete(item.idx);
        alert("삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error("아이템 삭제 실패", error);
        alert("아이템 삭제에 실패했습니다.");
      }
    }
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
        <SItem>{item.name}</SItem>
        <SItem>
          {item.status === "SUCCESS" ? (
            <CheckCircleOutlineIcon style={checkStyle} />
          ) : (
            <HighlightOffIcon style={HighlightOffIconStyle} />
          )}
        </SItem>
        <SItem>
          {item.portNumber1} , {item.portNumber2}
        </SItem>
        <STimeItem>{changeTime(item.lastSuccessDate)}</STimeItem>
        <STimeItem>{changeTime(item.lastFailureDate)}</STimeItem>
        <SItem>
          <DeleteOutlineIcon
            style={DeleteOutlineIconStyle}
            // onClick={handleDeleteClick}
          />
        </SItem>
        <SItem>
          <SButton onClick={handleItemClick}>상세보기</SButton>
        </SItem>
      </SDiv>
    </SItemList>
  );
}

const STimeItem = styled.div`
  flex: 2;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
  margin-right: 1rem;
  margin-left: 1rem;
`;

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
