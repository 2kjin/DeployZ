import styled from "styled-components";
import { theme } from "@/styles/theme";
import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import Guide1 from "@/assets/guide/fecheckguide.png";

export default function FECheckGuideModal() {
  return (
    <>
      <ModalContainer>
        <VerticalTimeline lineColor="none" layout="1-column">
          {timelineData.map((data, index) => (
            <VerticalTimelineElement
              intersectionObserverProps={{
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
              }}
              key={index}
              iconStyle={{
                background: `${theme.colors.checkgreen}`,
              }}
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
  width: 38%;
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
  p {
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }
`;
const ColorContainer = styled.div`
  background-color: ${theme.colors.lightgray};
  font-weight: ${theme.fontWeight.semibold};
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem 0;
`;
const Img = styled.img`
  width: 80%;
`;
const timelineData = [
  {
    title: "Frontend",
    content: (
      <Contentdiv>
        <ColorContainer>
          <p>
            API 설정 파일에서 API 요청 URL을 배포할 도메인에 맞게 수정해주세요.
            ( .env, api.ts 등 )
          </p>
          <p>ex) 도메인: k8a402.p.ssafy.io </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;백엔드 포트: 8080</p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-{">"}
            https://k8a402.p.ssafy.io:8080
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;( 프록시 패스를 설정했을
            경우,
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;프록시 패스: /api -{">"}
            https://k8a402.p.ssafy.io:8080/api )
          </p>
        </ColorContainer>
        <h1>Example Image</h1>
        <Img alt="Guide1" src={Guide1}></Img>
      </Contentdiv>
    ),
  },
];
