import styled, { keyframes } from "styled-components";
import { color, motion } from "framer-motion";
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
  RiNumber6,
  RiNumber7,
  RiNumber8, } from 'react-icons/ri';
import Guide1 from "@/assets/guide2.png";

export default function InfraGuideCompo() {
  return (
    <ModalContainer>
      <VerticalTimeline lineColor={`${theme.colors.secondary}`}>
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
              width: "42%",
            }}
            style={{ margin: '1rem auto' }}
          >
            <Title>{data.title}</Title>
            {data.content}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Svg
          id="svg"
          viewBox="0 0 1440 300"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "fixed", bottom: 0, left: 0 }}
          preserveAspectRatio="none"
        >
          <path
            d="M 0,400 C 0,400 0,200 0,200 C 52.417038818275515,195.67777396083818 1362.7097217451048,183.33631054620406 1440,200 C 1440,200 1440,400 1440,400 Z"
            stroke="none"
            strokeWidth="0"
            fill="#ffffff"
            fillOpacity="1"
            className="path-0"
          ></path>
        </Svg>
      </motion.div>

    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  height : 85vh;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.extrabold};
  padding-bottom: 0.5rem;
`;
const Contentdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  font-size: 1.4rem;
  font-weight: ${theme.fontWeight.semibold};
  line-height: 180%;
`;
const Img = styled.img`
  height: 35%;
  width: 35%;
`;
const animatePath = keyframes`
  0% {
    d: path("M 0,400 C 0,400 0,200 0,200 C 52.417038818275515,195.67777396083818 104.83407763655103,191.3555479216764 170,177 C 235.16592236344897,162.6444520783236 313.08072827207144,138.25558227413262 393,167 C 472.91927172792856,195.74441772586738 554.8430092751631,277.62212298179315 629,267 C 703.1569907248369,256.37787701820685 769.547234627276,153.25592579869465 826,126 C 882.452765372724,98.74407420130537 928.9680522157335,147.35417382342837 991,164 C 1053.0319477842665,180.64582617657163 1130.5805565097903,165.32737890759188 1208,166 C 1285.4194434902097,166.67262109240812 1362.7097217451048,183.33631054620406 1440,200 C 1440,200 1440,400 1440,400 Z");
  }
  25% {
    d: path("M 0,400 C 0,400 0,200 0,200 C 59.68601855032637,162.63483339058743 119.37203710065273,125.26966678117486 190,140 C 260.62796289934727,154.73033321882514 342.19787014771543,221.55616626588804 410,227 C 477.80212985228457,232.44383373411196 531.8364823084852,176.5056681552731 602,169 C 672.1635176915148,161.4943318447269 758.4562006183443,202.4211611130196 838,213 C 917.5437993816557,223.5788388869804 990.3387152181381,203.80968739264858 1054,204 C 1117.661284781862,204.19031260735142 1172.1889385091033,224.34008931638613 1235,227 C 1297.8110614908967,229.65991068361387 1368.9055307454482,214.82995534180694 1440,200 C 1440,200 1440,400 1440,400 Z");
  }
  50% {
    d: path("M 0,400 C 0,400 0,200 0,200 C 72.19787014771558,206.1614565441429 144.39574029543115,212.32291308828582 206,221 C 267.60425970456885,229.67708691171418 318.61490896599105,240.86980419099964 387,244 C 455.38509103400895,247.13019580900036 541.1446238406047,242.19787014771555 609,219 C 676.8553761593953,195.80212985228445 726.8065956715906,154.33871521813808 805,132 C 883.1934043284094,109.66128478186191 989.6289934730332,106.44726897973206 1061,128 C 1132.3710065269668,149.55273102026794 1168.677430436276,195.8722088629337 1226,212 C 1283.322569563724,228.1277911370663 1361.661284781862,214.06389556853316 1440,200 C 1440,200 1440,400 1440,400 Z");
  }
  75% {
    d: path("M 0,400 C 0,400 0,200 0,200 C 62.23222260391617,212.31879079354172 124.46444520783234,224.63758158708347 201,212 C 277.53555479216766,199.36241841291653 368.3744417725868,161.76846444520785 446,168 C 523.6255582274132,174.23153555479215 588.0377877018205,224.2885606320852 644,228 C 699.9622122981795,231.7114393679148 747.4744074201305,189.0772930264514 800,194 C 852.5255925798695,198.9227069735486 910.0645826176572,251.40226726210926 991,244 C 1071.9354173823428,236.59773273789074 1176.2672621092408,169.31363792511164 1255,152 C 1333.7327378907592,134.68636207488836 1386.8663689453797,167.3431810374442 1440,200 C 1440,200 1440,400 1440,400 Z");
  }
  100% {
    d: path("M 0,400 C 0,400 0,200 0,200 C 52.417038818275515,195.67777396083818 104.83407763655103,191.3555479216764 170,177 C 235.16592236344897,162.6444520783236 313.08072827207144,138.25558227413262 393,167 C 472.91927172792856,195.74441772586738 554.8430092751631,277.62212298179315 629,267 C 703.1569907248369,256.37787701820685 769.547234627276,153.25592579869465 826,126 C 882.452765372724,98.74407420130537 928.9680522157335,147.35417382342837 991,164 C 1053.0319477842665,180.64582617657163 1130.5805565097903,165.32737890759188 1208,166 C 1285.4194434902097,166.67262109240812 1362.7097217451048,183.33631054620406 1440,200 C 1440,200 1440,400 1440,400 Z");
  }
  `;

const Svg = styled.svg`
  z-index: -1;
  width: 100%;
  transition: all 300ms ease-in-out 150ms;
  .path-0 {
    animation: ${animatePath} 10s linear infinite;
  }
`;

const timelineData = [
  {
    icon: <RiNumber1 />,
    title: "1. EC2 인스턴스 생성 및 설정",
    content: (
      <Contentdiv>
        <Text>
          · AWS에서 적절한 AMI와 인스턴스 유형을 선택하여 EC2 인스턴스를 생성하고,
          보안 그룹 및 SSH 키를 설정합니다.
        </Text>
        <Img alt="Guide1" src={Guide1}></Img>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber2 />,
    title: "2. Docker 설치 및 권한 설정",
    content: (
      <Contentdiv>
      <Text>
        · EC2 인스턴스에 Docker를 설치하고, 도커 그룹에 현재 사용자를 추가하여
        권한 문제를 해결합니다.
      </Text>
      <Img alt="Guide1" src={Guide1}></Img>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber3 />,
    title: "3. 프론트엔드 및 백엔드 도커라이징",
    content: (
      <Contentdiv>
        <Text>
          · 프론트엔드와 백엔드에 대한 Dockerfile을 생성하고, 해당 디렉토리에서
          도커 이미지를 빌드합니다.<br/>
          · Docker Compose를 사용하여 프론트엔드와 백엔드 컨테이너를 생성하고
          연결합니다.
        </Text>
        <Img alt="Guide1" src={Guide1}></Img>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber4 />,
    title: "4. CI/CD 툴 설치 및 설정",
    content: (
      <Contentdiv>
      <Text>
       · EC2 인스턴스에 CI/CD 툴을 설치하고, CI/CD 툴에 맞는 플러그인 및 권한을
        설정합니다.
      </Text>
      <Img alt="Guide1" src={Guide1}></Img>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber5 />,
    title: "5. CI/CD 파이프라인 구축",
    content: (
      <Contentdiv>
      <Text>
        · 설치한 CI/CD 툴에 프로젝트를 가져와서 빌드, 테스트, 배포 과정을 자동화하는
        CI/CD 파이프라인을 구축합니다.
      </Text>
      <Img alt="Guide1" src={Guide1}></Img>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber6 />,
    title: "6. Nginx 설치 및 설정",
    content: (
      <Contentdiv>
      <Text>
       · Nginx를 설치하고, 프론트엔드 및 백엔드 컨테이너에 대한 리버스 프록시
        설정을 추가합니다.
      </Text>
      <Img alt="Guide1" src={Guide1}></Img>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber7 />,
    title: "7. 무중단 배포 설정",
    content: (
      <Contentdiv>
      <Text>
       · 블루-그린 배포 또는 카나리 배포와 같은 무중단 배포 전략을 선택하고,
        Jenkins 파이프라인 및 Nginx 설정에 적용합니다.
      </Text>
      <Img alt="Guide1" src={Guide1}></Img>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber8 />,
    title: "8. 최종 테스트 및 모니터링",
    content: (
      <Contentdiv>
      <Text>
        · 애플리케이션의 정상 작동 여부를 확인하고, 로그 및 모니터링 도구를
        사용하여 애플리케이션의 성능 및 안정성을 관리합니다.
      </Text>
      <Img alt="Guide1" src={Guide1}></Img>
      </Contentdiv>
    ),
  },
];
