import { useNavigate } from "react-router-dom";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import BgVideo from "@/assets/video/bgvideo.mp4";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useState } from "react";

import Modal from "@mui/material/Modal";

export default function VideoLanding() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  return (
    <>
      <Container>
        <VideoBg autoPlay loop muted src={BgVideo} />
        <Content>
          <Title>
            그동안
            <span style={{ fontWeight: `${theme.fontWeight.extrabold}` }}>
              &nbsp;'인프라'&nbsp;
            </span>
            너무 어려우셨나요?
          </Title>
          <Title>
            배포를 쉽게,
            <span style={{ fontWeight: `${theme.fontWeight.extrabold}` }}>
              &nbsp;DeployZ &nbsp;
            </span>
          </Title>
          <Guidebtn
            onClick={() => navigate("/intro")}
            onMouseEnter={onHover}
            onMouseLeave={onHover}
          >
            Start
            {hover ? (
              <ArrowForward sx={{ fontSize: "2rem" }} />
            ) : (
              <ArrowRight sx={{ fontSize: "2rem" }} />
            )}
          </Guidebtn>
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  width: 100vw;
  z-index: 1;
  overflow: hidden;
`;
const VideoBg = styled.video`
  width: 100vw;
  height: 100vh;
  -o-object-fit: cover;
  object-fit: cover;
`;
const Content = styled.div`
  z-index: 3;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  color: ${theme.colors.white};
  font-size: 5rem;
  padding: 1rem;
`;
const Guidebtn = styled.div`
  border-radius: 15rem;
  background: ${theme.colors.secondary};
  color: ${theme.colors.white};
  padding: 1.1rem 7rem;
  font-size: 2.5rem;
  margin-top: 6rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
    transition: all 0.4s ease-out;
    cursor: pointer;
  }
`;
const ArrowForward = styled(ArrowForwardRoundedIcon)`
  margin-left: 1rem;
`;
const ArrowRight = styled(KeyboardArrowRightRoundedIcon)`
  margin-left: 1rem;
`;
