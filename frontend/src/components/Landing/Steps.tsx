import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function Steps({ scrollIndex }: { scrollIndex: number }) {
  return (
    <>
      {scrollIndex !== 4 && (
        <Container>
          <div className="step-container">
            <Title className={scrollIndex === 1 ? "active" : ""}>
              CI/CD 파이프라인 구축
            </Title>
            <Step className={scrollIndex === 1 ? "active" : ""} />
          </div>
          <div className="sub-container">
            <div className="content-container">
              <Content className={scrollIndex === 1 ? "active" : ""}>
                기존의 복잡한 CI/CD 파이프 라인 구축을 간소화
              </Content>
              <br />
              <Content className={scrollIndex === 1 ? "active" : ""}>
                간편한 최소 입력만으로 파이프 라인 구축!
              </Content>
            </div>
            <Line />
          </div>

          <div className="step-container">
            <Title className={scrollIndex === 2 ? "active" : ""}>
              무중단 배포
            </Title>
            <Step className={scrollIndex === 2 ? "active" : ""} />
          </div>
          <div className="sub-container">
            <div className="content-container">
              <Content className={scrollIndex === 2 ? "active" : ""}>
                기존의 push후 빌드 시작, 서버 재가동을
              </Content>
              <br />
              <Content className={scrollIndex === 2 ? "active" : ""}>
                자동으로 해주는 무중단 배포
              </Content>
              <br />
              <Content className={scrollIndex === 2 ? "active" : ""}>
                복잡한 설정대신 저희가 도와드립니다.
              </Content>
            </div>
            <Line />
          </div>

          <div className="step-container">
            <Title className={scrollIndex === 3 ? "active" : ""}>
              복잡한 절차 간소화
            </Title>
            <Step className={scrollIndex === 3 ? "active" : ""} />
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  right: 5%;
  transform: translate(0, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: end;
  height: 65vh;
  .step-container {
    display: flex;
    align-items: center;
  }
  .sub-container {
    display: flex;
    align-items: center;
  }
  .content-container {
    display: flex;
    flex-direction: column;
    align-items: end;
  }
  &.active {
  }
`;
const Title = styled.h1`
  font-size: 2.2rem;
  color: #888fa7;
  transition: color 0.5s;
  transition-duration: 1000;
  &.active {
    font-size: 2.7rem;
    color: ${theme.colors.secondary};
  }
`;
const Content = styled.div`
  font-size: 1.7rem;
  font-weight: ${theme.fontWeight.semibold};
  color: rgba(0, 0, 0, 0);
  transition: color 0.5s;
  transition-duration: 1000;
  margin-right: 9rem;
  &.active {
    font-size: 1.7rem;
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.colors.primary};
  }
`;
const Line = styled.div`
  border-left: 1px solid #a5a5a5;
  height: 15rem;
  padding-right: 2.7rem;
`;
const Step = styled.div`
  height: 5rem;
  width: 5rem;
  background-color: #ebebeb;
  border-radius: 50%;
  transition: background-color 0.5s;
  transition-duration: 1000;
  margin-left: 5rem;
  &.active {
    height: 5.5rem;
    width: 5.5rem;
    background-color: ${theme.colors.secondary};
  }
`;
