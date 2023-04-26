import { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Modal from "@mui/material/Modal";
import InfraGuideModal from "@components/modal/InfraGuideModal";
import SSLGuideModal from "@components/modal/SSLGuideModal";
import WebhookGuideModal from "@components/modal/WebhookGuideModal";

export default function Landing1() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <div className="top-container">
        <Title>
          그동안 <b>'인프라'</b> 너무 어려우셨나요?
        </Title>
      </div>
      <div className="mid-container">
        <Guidebtn onClick={handleOpen}>Infra Guide</Guidebtn>
        <Modal open={open} onClose={handleClose}>
          <>
            <InfraGuideModal handleClose={handleClose} />
          </>
        </Modal>
        <Guidebtn>Start Now</Guidebtn>
      </div>
      <div className="bottom-container"></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 93vh;
  width: 100vw;
  background-color: ${theme.colors.primary};
  .top-container {
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mid-container {
    height: 30%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bottom-container {
    height: 30%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Title = styled.div`
  color: ${theme.colors.white};
  font-size: 5rem;
`;
const Guidebtn = styled.button`
  background: none;
  border-radius: 15rem;
  border-color: ${theme.colors.white};
  color: ${theme.colors.white};
  padding: 1rem 4rem;
  font-size: 3rem;
  margin: 5rem;
  font-weight: 700;
  border-width: 0.3rem;
  :hover {
    background: ${theme.colors.white};
    border-color: ${theme.colors.white};
    color: ${theme.colors.primary};
  }
`;
