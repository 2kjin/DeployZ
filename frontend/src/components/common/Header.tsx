import styled from "styled-components";
import { theme } from "@/styles/theme"

export default function Header() {
  return (
  <Container>
    <Logo alt="logo" src="src/assets/logo.png"/>
    <Loginbtn><Gitlab alt="gitlab" src="src/assets/gitlab.png"/>LOGIN</Loginbtn>
  </Container>
  )
}

const Container = styled.div`
  display : flex;
  justify-content: space-between;
  height : 7vh;
  width : 100vw;
  /* background-color : ${theme.colors.secondary}; */
`
const Logo = styled.img`
  padding : 0.5rem;
`
const Loginbtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.secondary};
  border-radius: 3rem;
  padding: 1.5rem;
  margin: 1rem;
  font-size: 2rem;
  font-weight: bold;
`
const Gitlab = styled.img`
  height : 4vh;
  padding: 0 1rem 0 0;
`