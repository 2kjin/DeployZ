import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme"

export default function Intro2() {

  return (
  <Container>
    <div className="left-container">
      <h1>이미지</h1>
    </div>
    <div className="right-container">
      <h1>무중단 배포</h1>
    </div>
  </Container>
  )
}

const Container = styled.div`
  display : flex;
  justify-content: center;
  height : 93vh;
  width : 100vw;
  background-color : ${theme.colors.primary};
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