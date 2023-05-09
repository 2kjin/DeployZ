import styled from "styled-components";
import { theme } from "@/styles/theme";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { styled as mstyled } from "@mui/material/styles";

import webhook1 from "@/assets/img/webhook1.png";
import webhook2 from "@/assets/img/webhook2.png";
import webhook3 from "@/assets/img/webhook3.png";

type Props = {
  handleClose: () => void;
};

export default function WebhookGuideModal({ handleClose }: Props) {
  return (
    <>
      <ModalContainer>
        <Title>
          Webhook 연결 가이드{" "}
          <CloseIcon sx={{ fontSize: 50 }} onClick={handleClose} />
        </Title>
        <SubTitle></SubTitle>
        <br />
        <br />
        <ColorContainer>
          📌 Webhook이란?
          <br />
          API의 일종으로 두 개의 시스템이 서로 상호 작용할 때 일어나는 이벤트에
          대한
          <br />
          자동 알림 매커니즘
          <br />
          <br />• GitLab의 경우, 웹훅을 통해 이벤트가 발생할 때마다 특정 URL로
          POST 요청을 보내고,
          <br />
          해당 URL에서는 전송받은 데이터를 파싱하여 이벤트에 대한 처리를 수행
          <br />• 코드가 변경될 때마다 빌드 및 배포를 자동으로 수행하거나,
          이메일로 알림을 보내는 등의
          <br />
          작업을 자동화 가능
        </ColorContainer>
        <br />
        <br />
        <NumTitle>1. GitLab에서 Setting → Webhooks 접속</NumTitle>
        <br />
        <br />
        <SImg1 src={webhook1} />
        <br />
        <br />
        <NumTitle>2. Secret Token 입력</NumTitle>
        <br />
        <ColorContainer>
          Secret Token을 넣어주세요!
          <br />
          <br />
          Webhook URL은 DeployZ에서 발급 받아서 자동으로 적용됩니다
        </ColorContainer>
        <br />
        <SImg2 src={webhook2} />
        <br />
        <br />
        <NumTitle>3. 이벤트 수신 및 처리 로직 작성</NumTitle>
        <br />
        <ColorContainer>
          해당 이벤트를 받아 처리할 로직을 작성해주세요
        </ColorContainer>
        <br />
        <br />
        <NumTitle>4. Webhooks 등록</NumTitle>
        <br />
        <ColorContainer>
          이벤트 발생 시점과 함께 Webhook이 등록돼요
        </ColorContainer>
        <br />
        <SImg3 src={webhook3} />
        <br />
        <br />
        <NumTitle>5. 이벤트 발생 및 Webhook 호출</NumTitle>
        <br />
        <ColorContainer>
          이벤트 발생 시 미리 등록한 Webhook URL로 HTTP POST 요청을 보내
          이벤트가 처리됩니다
        </ColorContainer>
        <br />
      </ModalContainer>
    </>
  );
}

const SImg1 = styled.img`
  width: 30rem;
  height: 50rem;
`;

const SImg2 = styled.img`
  width: 60rem;
  height: 50rem;
`;

const SImg3 = styled.img`
  width: 60rem;
  height: 50rem;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 80vh;
  border: none;
  /* box-shadow: 0 1px 2px, 0px 1px 2px inset; */
  border-radius: 4vh;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content : center; */
  background: ${theme.colors.container};
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const CloseIcon = mstyled(CancelRoundedIcon)({
  position: "sticky",
  color: `${theme.colors.primary}`,
  "&:hover": {
    color: `${theme.colors.secondary}`,
    transition: "all .3s ease-out",
    cursor: "pointer",
  },
});

const Title = styled.div`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.extrabold};
  font-size: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SubTitle = styled.div`
  font-weight: ${theme.fontWeight.extrabold};
  font-size: 2rem;
`;
const ColorContainer = styled.div`
  background-color: ${theme.colors.textbg};
  font-weight: ${theme.fontWeight.semibold};
  font-size: 1.8rem;
  padding: 1.5rem;
  border-radius: 1rem;
`;
const NumTitle = styled.div`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.extrabold};
  font-size: 2.3rem;
`;

