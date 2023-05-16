import { useEffect, useState } from "react";
import { theme } from "@/styles/theme";
import { FormControl, InputLabel } from "@mui/material";
import { alpha, styled as mstyled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import styled from "styled-components";
import MouseIcon from "@mui/icons-material/Mouse";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Proxypass from "./Step4/Porxypass";
import { useRecoilState, useRecoilValue } from "recoil";
import { NginxState, chapterState, stepState } from "@/recoil/step";
import Modal from "@mui/material/Modal";
import SSLGuideModal from "@components/Guide/SSLGuideModal";
import FECheckGuideModal from "@components/Guide/FECheckGuideModal";
import BECheckGuideModal from "@components/Guide/BECheckGuideModal";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export default function InputSection2() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [nginxConfig, setNginxConfig] =
    useRecoilState<INginxConfig>(NginxState);

  const nowChapter = useRecoilValue(chapterState);
  const [steps, setSteps] = useRecoilState(stepState);

  useEffect(() => {
    checkIsValid();
  }, [nginxConfig]);

  // 스텝 바꿀때 체크
  const checkIsValid = () => {
    if (
      nginxConfig.domainUrl === "" ||
      // nginxConfig.proxyPathList[0].pathName === "" ||
      // nginxConfig.proxyPathList[0].pathUrl === "" ||
      nginxConfig.sslCertificate === "" ||
      nginxConfig.sslCertificateKey === ""
    ) {
      const updatedSteps = steps.map((step) => {
        if (step.number === nowChapter) {
          return { ...step, isValid: false };
        } else {
          return step;
        }
      });

      setSteps(updatedSteps);
    } else {
      const updatedSteps = steps.map((step) => {
        if (step.number === nowChapter) {
          return { ...step, isValid: true };
        } else {
          return step;
        }
      });

      setSteps(updatedSteps);
    }
  };

  const handleItemData = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id as string;
    const value = target.value as string;

    setNginxConfig((cur) => ({
      ...cur,
      [id]: value,
    }));
  };

  const addProxy = () => {
    const newItem: IProxyPath = {
      idx: nginxConfig.proxyPathList.length,
      pathUrl: "",
      pathName: "",
    };
    const updatedItem = [...nginxConfig.proxyPathList, newItem];

    setNginxConfig((cur) => ({
      ...cur,
      proxyPathList: updatedItem,
    }));
  };

  const deleteProxy = (targetIndex: number) => {
    setNginxConfig((currentConfig) => {
      const updatedProxyPathList = currentConfig.proxyPathList.filter(
        (item) => item.idx !== targetIndex
      );

      return {
        ...currentConfig,
        proxyPathList: updatedProxyPathList,
      };
    });
  };

  return (
    <Container>
      {/* <p className="subject">Nginx 설정 정보 입력</p> */}
      <InputContainer>
        <FormControl variant="standard">
          <CustomInputLabel shrink>
            도메인 주소<RequiredMark>*</RequiredMark>
          </CustomInputLabel>
          <InputBox
            widthnum={"70rem"}
            fontnum={"1.5rem"}
            spacingnum={4}
            placeholder={`ex) deployz.co.kr`}
            id="domainUrl"
            value={nginxConfig.domainUrl}
            onChange={handleItemData}
          />
        </FormControl>
      </InputContainer>
      <InputContainer>
        <Section>
          <Label>
            SSL 인증서 등록
            <CustomTooltip
              disableFocusListener
              arrow
              placement="bottom-start"
              title={
                <div style={{ fontSize: "1.6rem" }}>
                  가이드는 HTTPS를 적용하기 위해 Let’s Encrypt의 Standalone
                  방식을 이용해 SSL 인증서를 발급하는 방식을 안내하고있습니다.
                  <br />
                  <br />
                  <b style={{ fontSize: "2rem" }}>📌Let’s Encrypt란?</b>
                  <br />
                  SSL을 무료로 발급해주는 CA(Certificate Authority) 비영리 기관
                  <br />
                  <br />
                  <b style={{ fontSize: "2rem" }}>📌Standalone</b>
                  <br />
                  사이트 작동을 멈추고 이 사이트의 네트워킹을 이용해 사이트
                  유효성을 확인해 Let’s Encrypt SSL 인증서를 발급하는 방식
                  <br />
                  80 포트로 가상 standalone 웹서버를 띄워 인증서를 발급{" "}
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
          <p>보안을 위해 HTTPS를 사용하려면 SSL 인증서를 등록해야돼요!</p>
          <SectionGuide>
            <p>방법을 잘 모르시겠다면,</p>
            <GuildButton onClick={handleOpen}>
              가이드 보러가기
              <MouseIcon sx={{ fontSize: 18, marginLeft: 0.3 }} />
            </GuildButton>
            <Modal open={open} onClose={handleClose}>
              <>
                <SSLGuideModal />
              </>
            </Modal>
          </SectionGuide>
          <SectionContainer>
            <InputContainer>
              <FormControl variant="standard">
                <InputLabel
                  shrink
                  sx={{
                    fontSize: "2rem",
                    color: "#151649",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  SSL Certificate<RequiredMark>*</RequiredMark>
                </InputLabel>
                <InputBox
                  widthnum={"30rem"}
                  fontnum={"1.2rem"}
                  spacingnum={3}
                  placeholder={` /etc/letsencrypt/live/${nginxConfig.domainUrl}/fullchain.pem`}
                  id="sslCertificate"
                  value={nginxConfig.sslCertificate}
                  onChange={handleItemData}
                />
              </FormControl>
            </InputContainer>
            <InputContainer>
              <FormControl variant="standard">
                <InputLabel
                  shrink
                  sx={{
                    fontSize: "2rem",
                    color: "#151649",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  SSL Certificate Key<RequiredMark>*</RequiredMark>
                </InputLabel>
                <InputBox
                  widthnum={"30rem"}
                  fontnum={"1.2rem"}
                  spacingnum={3}
                  placeholder={` /etc/letsencrypt/live/${nginxConfig.domainUrl}/privkey.pem`}
                  id="sslCertificateKey"
                  value={nginxConfig.sslCertificateKey}
                  onChange={handleItemData}
                />
              </FormControl>
            </InputContainer>
          </SectionContainer>
          <CheckContainer>
            <Label>
              <WarningIcon /> 환경변수 관련 체크사항
            </Label>
            <p>아래의 체크사항을 확인하고, 소스코드를 수정해주세요.</p>
            <p>
              관련 설정이 제대로 되어 있지 않을 경우 배포 시 문제가 발생할 수
              있습니다.
            </p>
            <CheckBtnContainer>
              <CheckButton onClick={handleOpen1}>
                Frontend Check <CheckIcon />
              </CheckButton>
              <Modal open={open1} onClose={handleClose1}>
                <>
                  <FECheckGuideModal />
                </>
              </Modal>
              <CheckButton onClick={handleOpen2}>
                Backend Check <CheckIcon />
              </CheckButton>
              <Modal open={open2} onClose={handleClose2}>
                <>
                  <BECheckGuideModal />
                </>
              </Modal>
            </CheckBtnContainer>
          </CheckContainer>
        </Section>
        <Section>
          <SectionCheck>
            <Label>Proxy Path</Label>
            <AddBtn onClick={addProxy}>추가</AddBtn>
          </SectionCheck>
          {nginxConfig.proxyPathList.map((pathItem) => (
            <Proxypass
              key={pathItem.idx}
              pathItem={pathItem}
              deleteProxy={deleteProxy}
            />
          ))}
        </Section>
      </InputContainer>
    </Container>
  );
}
const CheckContainer = styled.div`
  padding-top: 1.5rem;
  p {
    margin: 1rem 0;
    font-size: 1.5rem;
  }
`;
const CheckBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;
const WarningIcon = mstyled(WarningAmberRoundedIcon)({
  marginRight: "1rem",
  fontSize: "2rem",
  color: `${theme.colors.error}`,
  "&:hover": {
    transition: "all .2s ease-out",
    transform: "scale(1.3)",
    cursor: "pointer",
  },
});
const CheckButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px ${theme.colors.error};
  color: ${theme.colors.error};
  font-size: 1.5rem;
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
  font-weight: bold;
  cursor: pointer;
  :hover {
    color: white;
    background-color: ${theme.colors.error};
    transition: all 0.3s ease-out;
  }
`;
const CheckIcon = mstyled(CheckRoundedIcon)({
  marginLeft: ".5rem",
  fontSize: "2rem",
});
const SectionContainer = styled.div`
  background-color: ${theme.colors.container};
  padding: 1rem;
  border-radius: 1rem;
  margin: 2% 15% 2% 0;
`;

const RequiredMark = styled.strong`
  color: red;
  font-size: 2rem;
  margin-left: 0.2rem;
`;

const AddBtn = styled.div`
  background-color: ${theme.colors.secondary};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border-radius: 0.5rem;
  padding: 0.7rem 1.3rem;
  margin-left: 1rem;
  cursor: pointer;
  :hover {
    transform: scale(1.03);
  }
`;

const CustomInputLabel = mstyled(InputLabel)({
  fontSize: "2.9rem",
  fontWeight: "800",
  color: "#151649",
  fontFamily: "Pretendard",
});

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

const InputBox = mstyled(InputBase)<{
  widthnum: string;
  fontnum: string;
  spacingnum: number;
}>(({ theme, widthnum, fontnum, spacingnum }) => ({
  "label + &": {
    marginTop: theme.spacing(spacingnum),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: fontnum,
    width: widthnum,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color"]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    // 글꼴 설정 추가
    fontFamily: "Pretendard",
  },
}));

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
`;

const Label = styled.h4`
  font-size: 2rem;
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
  width: 42rem;

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
  margin-bottom: 2%;

  p {
    margin: 0.3rem 0.1rem;
  }
`;

const SectionCheck = styled.div`
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
