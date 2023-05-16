import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/styles/theme";

//import mui icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import StopIcon from "@mui/icons-material/Stop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { projectDetailInfo } from "@/types/project";
import { changeTime } from "@/api/projectApi";
import { requestDeploy } from "@/api/itemApi";
import { useState } from "react";
import { info, success, warning } from "@components/common/Toast/notify";
import { error } from "@components/common/Toast/notify";
import CircularProgress from "@mui/material/CircularProgress";

export default function ItemListElement({ item }: { item: projectDetailInfo }) {
  const navigate = useNavigate();
  const [buildStatus, setBuildStatus] = useState(item.status);
  const [playButtonHover, setPlayButtonHover] = useState<boolean>(false);
  const [delayStatus, SetdelayStatus] = useState<boolean>(true);

  const handlePlayButtonOn = () => {
    setPlayButtonHover(true);
  };

  const handlePlayButtonOff = () => {
    setPlayButtonHover(false);
  };

  const handleItemClick = () => {
    navigate(`/item/detail/${item.idx}`);
  };

  // 빌드 시작 버튼
  const sendReq = async () => {
    if (delayStatus) {
      setBuildStatus("WAITING");
      SetdelayStatus(false);
      info(`${item.name}의 빌드가 시작되었습니다.`);
      try {
        const {
          data: {
            result: { status },
          },
        } = await requestDeploy(item.idx);

        if (status === "SUCCESS") {
          setBuildStatus(status);
          success(`${item.name} 빌드 성공!`);
        }

        if (status === "FAIL") {
          setBuildStatus(status);
          error(`${item.name}의 빌드가 실패했습니다. 빌드 로그를 확인하세요.`);
        }
        SetdelayStatus(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      error("아직 빌드 진행중입니다.");
    }
  };

  return (
    <SItemList>
      <SButtonItem onClick={() => sendReq()}>
        {playButtonHover && (
          <PlayArrowIcon
            onMouseOut={handlePlayButtonOff}
            style={PlayArrowIconStyle}
          />
        )}
        {!playButtonHover && (
          <PlayArrowOutlinedIcon
            onMouseOver={handlePlayButtonOn}
            style={PlayArrowIconStyle}
          />
        )}
      </SButtonItem>
      <SButtonItem>
        <StopIcon
          style={StopIconStyle}
          onClick={() => warning("추후 업데이트 예정")}
        />
      </SButtonItem>
      <SNameItem>{item.name}</SNameItem>
      <SStatusItem>
        {buildStatus === null && "빌드전"}
        {buildStatus === "SUCCESS" && (
          <CheckCircleOutlineIcon style={checkStyle} />
        )}
        {buildStatus === "WAITING" && (
          <CircularProgress size={33} style={waitStyle} />
        )}
        {buildStatus === "FAIL" && (
          <HighlightOffIcon style={HighlightOffIconStyle} />
        )}
      </SStatusItem>
      <SPortItem>{item.portNumber}</SPortItem>
      <SSuccessItem>
        {buildStatus === null ? "빌드전" : changeTime(item.lastSuccessDate)}
      </SSuccessItem>
      <SFailItem>
        {buildStatus === null ? "빌드전" : changeTime(item.lastFailureDate)}
      </SFailItem>
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

const waitStyle = {
  color: theme.colors.secondary,
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

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
  width: 83vw;
  height: 5.5vh;
  padding: 1rem;
  background: ${theme.colors.lightgray};
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 1.8em;
`;
