import styled from "styled-components";
import { theme } from "@/styles/theme"

export default function Steps({scrollIndex}: {scrollIndex: number}) {
  return (
    <Container>
      <div className="step-container">
        <Title className={scrollIndex === 1 ? 'active' : ""}>CI/CD 파이프라인 구축</Title>
        {/* <Content>asdf</Content> */}
      <Step className={scrollIndex === 1 ? 'active' : ""} />
      </div>

      <div className="step-container">
        <Title className={scrollIndex === 2 ? 'active' : ""}>무중단 배포</Title>
      <Step className={scrollIndex === 2 ? 'active' : ""} />
      </div>

      <div className="step-container">
        <Title className={scrollIndex === 3 ? 'active' : ""}>복잡한 절차 간소화</Title>
      <Step className={scrollIndex === 3 ? 'active' : ""} />
      </div>

      <div className="step-container">
      <Step className={scrollIndex === 4 ? 'active' : ""} />
      </div>
    </Container>
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
  justify-content: space-between;
  align-items: end;
  height: 50vh;
  .step-container {
    display: flex;
    align-items: center;
  }
`
const Title = styled.h1`
  font-size : 2rem;
  color: #888FA7;
  transition: color 0.5s;
  transition-duration: 1000;
  &.active {
    font-size : 2.5rem;
    color : ${theme.colors.secondary};
  }
`
const Content = styled.div`
  
`
const Step = styled.div`
  height: 7vh;
  width: 7vh;
  background-color: #EBEBEB;
  border-radius: 50%;
  transition: background-color 0.5s;
  transition-duration: 1000;
  margin-left : 5rem;
  &.active {
    height: 8vh;
    width: 8vh;
    background-color: ${theme.colors.secondary};
  }
`