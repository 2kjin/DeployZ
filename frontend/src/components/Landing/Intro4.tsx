import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme"

export default function Intro4() {
  return (
  <Container>
    <Title>지금 바로 <b>'경험'</b> 해보세요</Title>
    <Guidebtn>START</Guidebtn>
  </Container>
  )
}

const Container = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height : 63vh;
  width : 100%;
  background-color : ${theme.colors.primary};

`
const Title = styled.div`
  color: ${theme.colors.white};
  font-size: 4rem;
`
const Guidebtn = styled.div`
  background: none;
  border-radius: 15rem;
  border: .3rem solid ${theme.colors.white};
  color: ${theme.colors.white};
  padding: 1rem 10rem;
  font-size: 2.5rem;
  margin: 5rem;
  font-weight: 700;
  :hover {
    background: ${theme.colors.white};
    border-color: ${theme.colors.white};
    color: ${theme.colors.primary};
    transition: all .4s ease-out;
    cursor: pointer;
  }
`