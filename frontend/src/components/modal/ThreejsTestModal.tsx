import styled from "styled-components";
import { theme } from "@/styles/theme";
import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import {
  Filter1Rounded,
  Filter2Rounded,
  Filter3Rounded,
  Filter4Rounded,
  Filter5Rounded,
  Filter6Rounded,
  Filter7Rounded,
  Filter8Rounded,
  Filter9Rounded,
} from "@mui/icons-material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { styled as mstyled } from "@mui/material/styles";
import * as THREE from "three";
import { useEffect, useRef } from "react";

type Props = {
  handleClose: () => void;
};

export default function ThreejsTestModal({ handleClose }: Props) {
  // 씬 초기화 함수를 선언합니다.
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (canvasContainerRef.current) {
      const cleanup = initThreeJS(canvasContainerRef.current);
      return cleanup;
    }
  }, [canvasContainerRef]);

  const initThreeJS = (container: HTMLDivElement) => {
    // 기본 three.js 씬 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 지오메트리 및 머터리얼을 사용해 메시를 생성합니다.
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: `${theme.colors.primary}`,
    });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    camera.position.z = 5;

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    // animate();

    const cleanup = () => {
      // 애니메이션 취소
      // cancelAnimationFrame(animate);

      // 씬에서 객체 제거
      scene.remove(cube);

      // 메모리 해제
      geometry.dispose();
      material.dispose();

      // 컨테이너에서 캔버스 제거
      container.removeChild(renderer.domElement);
    };

    return cleanup;
  };

  const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 90%;
    border: none;
    box-shadow: 0 2px 4px, 0px 1px 2px inset;
    border-radius: 4vh;
    background: ${theme.colors.container};
    color: ${theme.colors.primary};
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  `;
  const Timlinediv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;
  const Icondiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    position: sticky;
  `;
  const CloseIcon = mstyled(CancelRoundedIcon)({
    padding: "0.5em 0.5em 0 0.5em",
    color: `${theme.colors.primary}`,
    "&:hover": {
      color: `${theme.colors.secondary}`,
      cursor: "pointer",
    },
  });

  const Title = styled.div`
    font-size: 2rem;
    font-weight: ${theme.fontWeight.extrabold};
    padding: 1rem;
  `;
  const Contentdiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;
  const Text = styled.div`
    font-size: 1.5rem;
    padding: 1rem;
    font-weight: ${theme.fontWeight.semibold};
    line-height: 150%;
  `;
  const CanvasContainer = styled.div`
    height: 50%;
    width: 70%;
  `;
  const timelineData = [
    {
      icon: <Filter1Rounded />,
      title: "EC2 인스턴스 생성 및 설정",
      content: (
        <Contentdiv>
          <Text>
            AWS에서 적절한 AMI와 인스턴스 유형을 선택하여 EC2 인스턴스를
            생성하고, 보안 그룹 및 SSH 키를 설정합니다.
          </Text>
          <CanvasContainer ref={canvasContainerRef}></CanvasContainer>
        </Contentdiv>
      ),
    },
    {
      icon: <Filter2Rounded />,
      title: "Docker 설치 및 권한 설정",
      content: (
        <Text>
          EC2 인스턴스에 Docker를 설치하고, 도커 그룹에 현재 사용자를 추가하여
          권한 문제를 해결합니다.
        </Text>
      ),
    },
    {
      icon: <Filter3Rounded />,
      title: "프로젝트 소스코드 가져오기",
      content: (
        <Text>
          Git을 사용하여 프로젝트의 소스코드를 EC2 인스턴스로 복사합니다.
        </Text>
      ),
    },
    {
      icon: <Filter4Rounded />,
      title: "프론트엔드 및 백엔드 도커라이징",
      content: (
        <div>
          <Text>
            프론트엔드와 백엔드에 대한 Dockerfile을 생성하고, 해당 디렉토리에서
            도커 이미지를 빌드합니다.
          </Text>
          <Text>
            Docker Compose를 사용하여 프론트엔드와 백엔드 컨테이너를 생성하고
            연결합니다.
          </Text>
        </div>
      ),
    },
    {
      icon: <Filter5Rounded />,
      title: "Jenkins 설치 및 설정",
      content: (
        <Text>
          EC2 인스턴스에 Jenkins를 설치하고, Jenkins 플러그인 및 권한을
          설정합니다.
        </Text>
      ),
    },
    {
      icon: <Filter6Rounded />,
      title: "CI/CD 파이프라인 구축",
      content: (
        <Text>
          Jenkins에서 프로젝트를 가져와서 빌드, 테스트, 배포 과정을 자동화하는
          CI/CD 파이프라인을 구축합니다.
        </Text>
      ),
    },
    {
      icon: <Filter7Rounded />,
      title: "Nginx 설치 및 설정",
      content: (
        <Text>
          Nginx를 설치하고, 프론트엔드 및 백엔드 컨테이너에 대한 리버스 프록시
          설정을 추가합니다.{" "}
        </Text>
      ),
    },
    {
      icon: <Filter8Rounded />,
      title: "무중단 배포 설정",
      content: (
        <Text>
          블루-그린 배포 또는 카나리 배포와 같은 무중단 배포 전략을 선택하고,
          Jenkins 파이프라인 및 Nginx 설정에 적용합니다.
        </Text>
      ),
    },
    {
      icon: <Filter9Rounded />,
      title: "최종 테스트 및 모니터링",
      content: (
        <Text>
          애플리케이션의 정상 작동 여부를 확인하고, 로그 및 모니터링 도구를
          사용하여 애플리케이션의 성능 및 안정성을 관리합니다.
        </Text>
      ),
    },
  ];

  return (
    <>
      <ModalContainer>
        {/* <Topdiv>
    </Topdiv> */}
        <Icondiv>
          <CloseIcon sx={{ fontSize: 50 }} onClick={handleClose} />
        </Icondiv>
        <Timlinediv>
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
                  background: `${theme.colors.primary}`,
                  color: `${theme.colors.white}`,
                }}
                icon={data.icon}
                contentStyle={{
                  borderRadius: "1rem",
                  width: "42%",
                }}
                // style={{ width: "80%", margin: '2rem auto' }}
              >
                <Title>{data.title}</Title>
                {data.content}
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </Timlinediv>
      </ModalContainer>
    </>
  );
}
