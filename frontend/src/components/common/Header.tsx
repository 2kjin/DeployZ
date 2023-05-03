import styled from "styled-components";
import { theme } from "@/styles/theme";
import { useLocation, useNavigate } from "react-router-dom";
import LogoPic from "@/assets/logo.png";
import GitlabPic from "@/assets/gitlab.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestLogout } from "@/api/auth";

export default function Header({ type }: { type: String }) {
  const navigate = useNavigate();
  const uselocation = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

  const logout = async () => {
    try {
      await requestLogout();
      if (uselocation.pathname === "/") {
        location.reload();
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container type={type}>
      {isLogin ? (
      <Logo alt="logo" src={LogoPic} onClick={() => navigate("/project")}/>
      ) : (
      <Logo alt="logo" src={LogoPic} onClick={() => navigate("/")}/>
      )}
      <div className="nav-container">
      {isLogin && (
      <NavStyle to="/project" >Project List</NavStyle> )}
      {isLogin && (
      <NavStyle to="/step" >Infra Guide</NavStyle> )}
      {isLogin ? (
      <Loginbtn onClick={() => logout()}>
        <Gitlab alt="gitlab" src={GitlabPic} />
        LOGOUT
      </Loginbtn>
      ) : (
      <Loginbtn href="https://deployz.co.kr/oauth2/authorization/gitlab">
      <Gitlab alt="gitlab" src={GitlabPic} />
      LOGIN
      </Loginbtn>
      )}
      </div>
    </Container>
  );
}

const Container = styled.div<{ type: String }>`
  display: flex;
  justify-content: space-between;
  height: 7vh;
  padding: 0 1.5rem;
  background-color: ${(props) =>
    props.type == "intro" ? theme.colors.container : theme.colors.primary};
  .nav-container {
    display: flex;
  }
`;
const NavStyle = styled(NavLink)`
  display: flex;
  align-items: center;
  color: white;
  padding: 2rem;
  font-size: 2rem;
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: ${theme.colors.secondary};
    filter: drop-shadow(0.6vh 0.6vh 0.3vh rgb(0 0 0 / 0.6));
  }
  &.active {
    filter: drop-shadow(0.6vh 0.6vh 0.3vh rgb(0 0 0 / 0.6));
    color: ${theme.colors.secondary};
    position: relative;
    bottom: 0.2rem;
    border-bottom: 0.2rem solid ${theme.colors.secondary};
  }
`;
const Logo = styled.img`
  padding: 0.5rem;
  :hover {
    cursor: pointer;
  }
`
const Loginbtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  color: ${theme.colors.secondary};
  border: 0.3rem solid ${theme.colors.secondary};
  border-radius: 2.5rem;
  padding: 1.5vh;
  margin: 1vh;
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.extrabold};
  text-decoration: none;
  :hover {
    background: ${theme.colors.secondary};
    border-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    transition: all 0.4s ease-out;
    cursor: pointer;
  }
`;
const Gitlab = styled.img`
  height: 3.5vh;
  padding: 0 1rem 0 0;
`;
