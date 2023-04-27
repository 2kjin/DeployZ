import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme"

export default function Intro2() {

  return (
  <Container>
    <h1>무중단 배포</h1>
  </Container>
  )
}

const Container = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
  height : 97vh;
  width : 100vw;
  background-color : ${theme.colors.primary};
`