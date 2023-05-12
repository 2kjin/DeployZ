import styled from "styled-components";
import { theme } from "@/styles/theme";
import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
} from "react-icons/ri";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { styled as mstyled } from "@mui/material/styles";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import { info } from "@components/common/Toast/notify";

type Props = {
  handleClose: () => void;
};

export default function SSLGuideModal() {
  return (
    <>
      <ModalContainer>
        <VerticalTimeline
          lineColor={`${theme.colors.secondary}`}
          layout="1-column"
        >
          {timelineData.map((data, index) => (
            <VerticalTimelineElement
              intersectionObserverProps={{
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
              }}
              key={index}
              iconStyle={{
                background: `${theme.colors.secondary}`,
                color: `${theme.colors.white}`,
              }}
              icon={data.icon}
              contentStyle={{
                borderRadius: "1rem",
                width: "88%",
                padding: "2rem",
              }}
              style={{ margin: "1rem 0" }}
            >
              <NumTitle>{data.title}</NumTitle>
              {data.content}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </ModalContainer>
    </>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 85%;
  border: none;
  padding: 0 1rem;
  /* box-shadow: 0 2px 4px, 0px 1px 2px inset; */
  border-radius: 4vh;
  /* background: ${theme.colors.container}; */
  color: ${theme.colors.primary};
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
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
const NumTitle = styled.div`
  display: flex;
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.extrabold};
  padding-bottom: 0.5rem;
  font-size: 2.2rem;
`;
const Contentdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 0;
`;
const ColorContainer = styled.div`
  background-color: ${theme.colors.lightgray};
  font-weight: ${theme.fontWeight.semibold};
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;
const Ex = styled.div`
  font-size: 1.2rem;
`;
const NumSub = styled.div`
  font-weight: ${theme.fontWeight.semibold};
  font-size: 1.4rem;
  padding-top: 1rem;
`;

const timelineData = [
  {
    icon: <RiNumber1 />,
    title: "1. Nginx 중지",
    content: (
      <Contentdiv>
        <CopyToClipboard
          className="Toram"
          text="sudo systemctl stop nginx"
          onCopy={() => info("복사되었습니다.")}
        >
          <ColorContainer>
            <text>sudo systemctl stop nginx</text>
            <CopyIcon />
          </ColorContainer>
        </CopyToClipboard>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber2 />,
    title: "2. Let’s Encrypt 설치",
    content: (
      <Contentdiv>
        <CopyToClipboard
          className="Toram"
          text="sudo apt-get update"
          onCopy={() => info("복사되었습니다.")}
        >
          <ColorContainer>
            <text>sudo apt-get update</text>
            <CopyIcon />
          </ColorContainer>
        </CopyToClipboard>
        <CopyToClipboard
          className="Toram"
          text="sudo apt-get install letsencrypt -y"
          onCopy={() => info("복사되었습니다.")}
        >
          <ColorContainer>
            <text>sudo apt-get install letsencrypt -y</text>
            <CopyIcon />
          </ColorContainer>
        </CopyToClipboard>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber3 />,
    title: "3. 인증서 적용",
    content: (
      <Contentdiv>
        <CopyToClipboard
          className="Toram"
          text="sudo letsencrypt certonly --standalone -d"
          onCopy={() => info("복사되었습니다.")}
        >
          <ColorContainer>
            <text>
              sudo letsencrypt certonly --standalone -d [발급받을 도메인]
            </text>

            <CopyIcon />
          </ColorContainer>
        </CopyToClipboard>
        <Ex>ex) sudo letsencrypt certonly —standalone -d j8a402.p.ssafy.io</Ex>
        <NumSub>
          3-1. 이메일 입력(선택)
          <br />
          3-2. 서비스 이용 동의(필수)
          <br />
          3-3. 정보 수집 동의(선택)
        </NumSub>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber4 />,
    title: "4. 발급 경로 확인",
    content: (
      <Contentdiv>
        <CopyToClipboard
          className="Toram"
          text="sudo su root"
          onCopy={() => info("복사되었습니다.")}
        >
          <ColorContainer>
            <text>sudo su root</text>
            <CopyIcon />
          </ColorContainer>
        </CopyToClipboard>
        <CopyToClipboard
          className="Toram"
          text="cd /etc/letsencrypt/live/"
          onCopy={() => info("복사되었습니다.")}
        >
          <ColorContainer>
            <text>cd /etc/letsencrypt/live/[발급받을 도메인]</text>
            <CopyIcon />
          </ColorContainer>
        </CopyToClipboard>
        <Ex>
          • cert.pem : 도메인 인증서
          <br />
          • chain.pem : Let's Encrypt chain 인증서
          <br />
          • fullchain.pem : cert.pem 과 chain 인증서 합본
          <br />• privkey.pem : 개인키
        </Ex>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber5 />,
    title: "5. Nginx 재시작",
    content: (
      <Contentdiv>
        <CopyToClipboard
          className="Toram"
          text="sudo systemctl restart nginx"
          onCopy={() => info("복사되었습니다.")}
        >
          <ColorContainer>
            <text>sudo systemctl restart nginx</text>
            <CopyIcon />
          </ColorContainer>
        </CopyToClipboard>
      </Contentdiv>
    ),
  },
];
