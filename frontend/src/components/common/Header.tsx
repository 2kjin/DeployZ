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
`;
const Logo = styled.img`
  padding: 0.5rem;
`;
const Loginbtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.secondary};
  border-radius: 3rem;
  border: none;
  padding: 1.5vh;
  margin: 1vh;
  font-size: 2rem;
  font-weight: bold;
`;
const Gitlab = styled.img`
  height: 4vh;
  padding: 0 1rem 0 0;
`;
