import styled from "styled-components";
import { theme } from "@/styles/theme";
import LogoPic from "@/assets/logo.png";
import GitlabPic from "@/assets/gitlab.png";

export default function Header() {
  return (
    <Container>
      <Logo alt="logo" src={LogoPic} />
      <Loginbtn>
        <Gitlab alt="gitlab" src={GitlabPic} />
        LOGIN
      </Loginbtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7vh;
  padding: 0 1.5rem;
  /* background-color : ${theme.colors.secondary}; */
`
const Logo = styled.img`
  padding: 0.5rem;
`
const Loginbtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  color: ${theme.colors.secondary};
  border: .3rem solid ${theme.colors.secondary};
  border-radius: 2.5rem;
  padding: 1.5vh;
  margin: 1vh;
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.extrabold};
  :hover {
  background: ${theme.colors.secondary};
  border-color: ${theme.colors.secondary};
  color: ${theme.colors.white};
  transition: all .4s ease-out;
  cursor: pointer;
}
`
const Gitlab = styled.img`
  height: 3.5vh;
  padding: 0 1rem 0 0;
`
