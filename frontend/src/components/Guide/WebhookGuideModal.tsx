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
import webhook1 from "@/assets/img/webhook1.png";
import webhook2 from "@/assets/img/webhook2.png";
import webhook3 from "@/assets/img/webhook3.png";

type Props = {
  handleClose: () => void;
};

export default function WebhookGuideModal() {
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
  width: 36%;
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
const Icondiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  position: sticky;
`;
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
const SImg1 = styled.img`
  height: 15rem;
  padding: 1rem 3rem;
`;
const SImg2 = styled.img`
  height: 15rem;
  padding: 1rem 3rem;
`;
const SImg3 = styled.img`
  height: 15rem;
  padding: 1rem 3rem;
`;
const timelineData = [
  {
    icon: <RiNumber1 />,
    title: "1. GitLab에서 Setting → Webhooks 접속",
    content: (
      <Contentdiv>
        <SImg1 src={webhook1} />
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber2 />,
    title: "2. Secret Token 입력",
    content: (
      <Contentdiv>
        <ColorContainer>
          Secret Token을 넣어주세요!
          <br /> Webhook URL은 DeployZ에서 발급 받아서 자동으로 적용됩니다
        </ColorContainer>
        <SImg2 src={webhook2} />
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber3 />,
    title: "3. 이벤트 수신 및 처리 로직 작성",
    content: (
      <Contentdiv>
        <ColorContainer>
          해당 이벤트를 받아 처리할 로직을 작성해주세요
        </ColorContainer>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber4 />,
    title: "4. Webhooks 등록",
    content: (
      <Contentdiv>
        <ColorContainer>
          이벤트 발생 시점과 함께 Webhook이 등록돼요
        </ColorContainer>
        <SImg3 src={webhook3} />
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber5 />,
    title: "5. 이벤트 발생 및 Webhook 호출",
    content: (
      <Contentdiv>
        <ColorContainer>
          이벤트 발생 시 미리 등록한 Webhook URL로 HTTP POST 요청을 보내
          이벤트가 처리됩니다
        </ColorContainer>
      </Contentdiv>
    ),
  },
];
