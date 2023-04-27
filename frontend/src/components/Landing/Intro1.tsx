import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme"

export default function Intro1() {

  return (
  <Container>
    <div className="left-container">
      <h1>이미지</h1>
    </div>
    <div className="right-container">
      <Stepdiv>
        <Step/><h1>CI/CD 파이프라인 구축</h1>
        <Step/>
        <Step/>
      </Stepdiv>
    </div>
  </Container>
  )
}

const Container = styled.div`
  display : flex;
  justify-content: center;
  height : 93vh;
  width : 100%;
  background-color : ${theme.colors.container};
  .left-container {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-container {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const Stepdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem;
`
const Step = styled.div`
  height: 6vh;
  width: 6vh;
  background-color: ${theme.colors.secondary};
  border-radius: 50%;
  margin-bottom: 2rem;

`