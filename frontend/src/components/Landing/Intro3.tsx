import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme"

export default function Intro3() {

  return (
  <Container>
    <h1>복잡한 절차 간소화</h1>
  </Container>
  )
}

const Container = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
  height : 97vh;
  width : 100vw;
  background-color : ${theme.colors.container};
`