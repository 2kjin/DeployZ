import { useState } from "react";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { itemListState } from "@/recoil/step";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";
import MouseIcon from "@mui/icons-material/Mouse";
import Modal from "@mui/material/Modal";
import WebhookGuideModal from "@components/Guide/WebhookGuideModal";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { styled as mstyled } from "@mui/material/styles";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import { info } from "@components/common/Toast/notify";

export default function InputSection2() {
  const itemList = useRecoilValue<IItem[]>(itemListState);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const itemName = itemList.map((item: IItem) => {
    return [item.branchName, item.secretToken];
  });

  return (
    <Container>
      {/* <p className="subject">Git 정보 입력</p> */}
      {/* 둘째 줄 */}
      <InputContainer>
        <Section>
          <Label>
            Webhook 연결
            <CustomTooltip
              disableFocusListener
              arrow
              placement="bottom-start"
              title={
                <div style={{ fontSize: "1.6rem" }}>
                  <b style={{ fontSize: "2rem" }}>📌 Webhook이란?</b>
                  <br />
                  API의 일종으로 두 개의 시스템이 서로 상호 작용할 때 일어나는
                  이벤트에 대한 자동 알림 매커니즘
                  <br />
                  <br />
                  GitLab의 경우, 웹훅을 통해 이벤트가 발생할 때마다 특정 URL로
                  POST 요청을 보내고, 해당 URL에서는 전송받은 데이터를 파싱하여
                  이벤트에 대한 처리를 수행
                  <br />
                  <br />
                  코드가 변경될 때마다 빌드 및 배포를 자동으로 수행하거나,
                  이메일로 알림을 보내는 등의 작업을 자동화 가능
                </div>
              }
            >
              <HelpOutlineIcon
                sx={{
                  fontSize: "2.5rem",
                  marginLeft: "1rem",
                  color: `${theme.colors.secondary}`,
                  cursor: "pointer",
                }}
              />
            </CustomTooltip>
          </Label>
          <SectionContainer>
            <p>
              자동 배포 기능을 사용하려면 레포지토리에 직접 Branch별로
              <p /> Webhook을 연결해야해요.
            </p>
            <SectionGuide>
              <p>방법을 잘 모르시겠다면,</p>
              {"  "}
              <GuildButton onClick={handleOpen}>
                가이드 보러가기{" "}
                <MouseIcon sx={{ fontSize: 18, marginLeft: 0.3 }} />
              </GuildButton>
              <Modal open={open} onClose={handleClose}>
                <>
                  <WebhookGuideModal />
                </>
              </Modal>
            </SectionGuide>
          </SectionContainer>
        </Section>
        <Section>
          <Label>Secret Token</Label>
          <SectionContainer>
            {itemName.map((item, idx) => {
              return (
                <SecretSection key={idx}>
                  <SecretLeft># {item[0]}</SecretLeft>
                  <SecretRight>{item[1]}</SecretRight>
                  <CopyContainer>
                    <CopyToClipboard
                      className="Toram"
                      text={item[1]}
                      onCopy={() => info("복사되었습니다.")}
                    >
                      <CopyIcon />
                    </CopyToClipboard>
                  </CopyContainer>
                </SecretSection>
              );
            })}
          </SectionContainer>
          <SecretLeft className="alert">
            <SdCardAlertIcon sx={{ fontSize: "2.5rem" }} />
            Secret Token은 따로 저장해 보관해야해요!
          </SecretLeft>
        </Section>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  /* background-color: ${theme.colors.container}; */
  flex: 4;
  margin: 2rem 1.5rem;
  border-radius: 1rem;
  padding: 2.5rem;
  color: ${theme.colors.primary};

  .subject {
    font-size: 3.7rem;
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SectionContainer = styled.div`
  background-color: ${theme.colors.container};
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 2%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 3%;
`;

const Label = styled.h4`
  font-size: 2.6rem;
  font-weight: 700;
  color: #151649;
  margin: 0;
  display: flex;
  align-items: center;
`;

const GuildButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px ${theme.colors.secondary};
  color: ${theme.colors.secondary};
  font-size: 1.5rem;
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1rem;

  :hover {
    color: white;
    background-color: ${theme.colors.secondary};
    transition: all 0.3s ease-out;
  }
`;

const Section = styled.div`
  width: 45rem;
  margin-bottom: 5%;

  .alert {
    font-size: 1.5rem;
    color: ${theme.colors.error};
    display: flex;
    align-items: center;
  }

  p,
  span {
    font-size: 1.5rem;
  }
`;

const SectionGuide = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0.3rem 0.1rem;
  }
`;

const SecretSection = styled.div`
  display: flex;
  width: 100%;
`;

const SecretLeft = styled.div`
  flex: 3;
  font-weight: bold;
  font-size: 1.7rem;
  padding: 1rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SecretRight = styled.div`
  font-size: 1.5rem;
  margin-left: 3%;
  flex: 2;
  display: flex;
  align-items: center;
`;
const CopyContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#151649",
    maxWidth: 500,
    padding: "1.2rem",
    fontFamily: "Pretendard",
  },
  [`& .${tooltipClasses.arrow}`]: {
    fontSize: "2rem",
    color: "#151649",
  },
}));
const CopyIcon = mstyled(ContentCopyIcon)({
  marginLeft: "1rem",
  color: `${theme.colors.primary}`,
  "&:hover": {
    color: `${theme.colors.secondary}`,
    transition: "all .2s ease-out",
    transform: "scale(1.3)",
    cursor: "pointer",
  },
});
