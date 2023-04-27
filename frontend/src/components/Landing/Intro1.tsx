import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme"

export default function Intro1() {

  return (
  <Container>
    <h1>CI/CD 파이프라인 구축</h1>
  </Container>
  )
}

const Container = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
  height : 93vh;
  width : 100vw;
  background-color : ${theme.colors.container};
`