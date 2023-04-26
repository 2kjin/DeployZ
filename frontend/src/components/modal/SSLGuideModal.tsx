import styled from "styled-components";
import { theme } from "@/styles/theme"
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { styled as mstyled } from "@mui/material/styles";


type Props = {
  handleClose: () => void;
}

export default function SSLGuideModal({ handleClose }: Props) {
  return (
    <>
    <ModalContainer>
      <Title>
        SSL 인증서 발급 가이드 <CloseIcon sx={{ fontSize: 50 }} onClick={handleClose}/>
      </Title><br/><br/>
      <SubTitle>
        https를 적용하기 위해선 SSL 인증서 발급이 필요합니다.<br/>
        Let’s Encrypt의 Standalone 방식을 이용해 SSL 인증서를 발급해보겠습니다.
      </SubTitle><br/><br/>
      <ColorContainer>
        <p>📌Let’s Encrypt란?<br/>
          SSL을 무료로 발급해주는 CA(Certificate Authority) 비영리 기관<br/>
          Standalone <br/><br/>
          • 사이트 작동을 멈추고 이 사이트의 네크워킹을 이용해 사이트 유효성을 확인해 Let’s Encrypt SSL 인증서를 발급하는 방식 • 80 포트로 가상 standalone 웹서버를 띄워 인증서를 발급 </p>
      </ColorContainer><br/><br/>
      <NumTitle>
        1. Nginx 중지
      </NumTitle><br/>
      <ColorContainer>
        sudo systemctl stop nginx
      </ColorContainer><br/><br/>
      <NumTitle>
        2. Let’s Encrypt 설치
      </NumTitle><br/>
      <ColorContainer>
        <p>sudo apt-get update<br/>
          sudo apt-get install letsencrypt -y</p>
      </ColorContainer><br/><br/>
      <NumTitle>
        3. 인증서 적용
      </NumTitle><br/>
      <ColorContainer>
        sudo letsencrypt certonly --standalone -d [발급받을 도메인]
      </ColorContainer><br/>
      <Ex>
        ex) sudo letsencrypt certonly —standalone -d j8a402.p.ssafy.io
      </Ex><br/>
      <NumSub>
        <p>
          3-1. 이메일 입력(선택)<br/>
          3-2. 서비스 이용 동의(필수)<br/>
          3-2. 정보 수집 동의(선택)<br/>
        </p>
      </NumSub><br/><br/>
      <NumTitle>
        4. 발급 경로 확인
      </NumTitle><br/>
      <ColorContainer>
        <p>sudo su root<br/>
          cd /etc/letsencrypt/live/[발급받을 도메인]</p>
      </ColorContainer><br/>
      <Ex>
        <p>
          • cert.pem : 도메인 인증서<br/>
          • chain.pem : Let's Encrypt chain 인증서<br/>
          • fullchain.pem : cert.pem 과 chain 인증서 합본<br/>
          • privkey.pem : 개인키
        </p>
      </Ex><br/><br/>
      <NumTitle>
        5. Nginx 재시작
      </NumTitle><br/>
      <ColorContainer>
        sudo systemctl restart nginx
      </ColorContainer><br/>
    </ModalContainer>
    </>
  )
}

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 80vh;
  border: none;
  box-shadow: 0 2px 4px, 0px 1px 2px inset;
  border-radius: 4vh;
  padding : 3rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content : center; */
  background : ${theme.colors.container};
  overflow : auto ;
  ::-webkit-scrollbar {
    display: none;
}
`
const CloseIcon = mstyled(CancelRoundedIcon)({
  position : 'sticky',
  color : `${theme.colors.primary}`,
  '&:hover': {
    color: `${theme.colors.secondary}`,
    cursor: 'pointer',
  },
});

const Title = styled.div`
  color : ${theme.colors.primary};
  font-weight: ${theme.fontWeight.extrabold};
  font-size : 4rem;
  display : flex;
  justify-content : space-between;
  align-items: center;
`
const SubTitle = styled.div`
  font-weight: ${theme.fontWeight.extrabold};
  font-size : 2rem ;
`
const ColorContainer = styled.div`
  background-color : ${theme.colors.textbg};
  font-weight: ${theme.fontWeight.extrabold};
  font-size : 2rem ;
  padding : 1.5rem;
  border-radius: 1rem;
`
const NumTitle = styled.div`
  color : ${theme.colors.primary};
  font-weight: ${theme.fontWeight.extrabold};
  font-size : 3rem;
`
const Ex = styled.div`
  font-size : 2rem ;
`
const NumSub = styled.div`
  font-weight: ${theme.fontWeight.extrabold};
  font-size : 2rem ;
`