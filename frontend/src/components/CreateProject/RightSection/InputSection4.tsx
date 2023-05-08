import { useEffect, useState } from "react";
import { theme } from "@/styles/theme";
import { FormControl, InputLabel } from "@mui/material";
import { alpha, styled as mstyled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import styled from "styled-components";
import MouseIcon from "@mui/icons-material/Mouse";
import Proxypass from "./Step4/Porxypass";
import { useRecoilState, useRecoilValue } from "recoil";
import { NginxState, chapterState, stepState } from "@/recoil/step";
import Modal from "@mui/material/Modal";
import SSLGuideModal from "@components/Guide/SSLGuideModal";

export default function InputSection2() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      nginxConfig.proxyPathList[0].pathName === "" ||
      nginxConfig.proxyPathList[0].pathUrl === "" ||
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
      <p className="subject">Nginx 설정 정보 입력</p>
      <InputContainer>
        <FormControl variant="standard">
          <InputLabel
            shrink
            sx={{
              fontSize: "2.6rem",
              fontWeight: "700",
              color: "#151649",
            }}
          >
            EC2 도메인 주소
          </InputLabel>
          <InputBox
            widthnum={"50rem"}
            fontnum={"1.5rem"}
            spacingnum={4}
            placeholder={`도메인 주소를 입력하세요.`}
            id="domainUrl"
            value={nginxConfig.domainUrl}
            onChange={handleItemData}
          />
        </FormControl>
      </InputContainer>
      <InputContainer>
        <Section>
          <Label>SSL 인증서 등록</Label>
          <p>보안을 위해 HTTPS를 사용하려면 SSL 인증서를 등록해야돼요!</p>
          <SectionGuide>
            <p>방법을 잘 모르시겠다면,</p>
            <GuildButton onClick={handleOpen}>
              가이드 보러가기
              <MouseIcon sx={{ fontSize: 18, marginLeft: 0.3 }} />
            </GuildButton>
            <Modal open={open} onClose={handleClose}>
              <>
                <SSLGuideModal handleClose={handleClose} />
              </>
            </Modal>
          </SectionGuide>
          <InputContainer>
            <FormControl variant="standard">
              <InputLabel
                shrink
                sx={{
                  fontSize: "2rem",
                  color: "#151649",
                }}
              >
                SSL Certificate
              </InputLabel>
              <InputBox
                widthnum={"30rem"}
                fontnum={"1.2rem"}
                spacingnum={3}
                placeholder={`SSL Certificate를 입력하세요.`}
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
                }}
              >
                SSL Certificate Key
              </InputLabel>
              <InputBox
                widthnum={"30rem"}
                fontnum={"1.2rem"}
                spacingnum={3}
                placeholder={`SSL Certificate Key를 입력하세요.`}
                id="sslCertificateKey"
                value={nginxConfig.sslCertificateKey}
                onChange={handleItemData}
              />
            </FormControl>
          </InputContainer>
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
  width: 82%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
`;

const Label = styled.h4`
  font-size: 2rem;
  font-weight: 700;
  color: #151649;
  margin: 0;
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
