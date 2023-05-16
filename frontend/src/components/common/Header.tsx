import styled from "styled-components";
import { theme } from "@/styles/theme";
import { useLocation, useNavigate } from "react-router-dom";
import LogoPic from "@/assets/logo/logo.png";
import LoginLogo from "@/assets/logo/logo2.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestLogout } from "@/api/auth";

export default function Header({ type }: { type: String }) {
  const navigate = useNavigate();
  const uselocation = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("accessToken");

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
        <Logo alt="logo" src={LogoPic} onClick={() => navigate("/project")} />
      ) : (
        <Logo alt="logo" src={LogoPic} onClick={() => navigate("/")} />
      )}
      <div className="nav-container">
        {isLogin && <NavStyle to="/project">Project List</NavStyle>}
        {isLogin && <NavStyle to="/infraguide">Infra Guide</NavStyle>}
        {isLogin ? (
          <Loginbtn onClick={() => logout()}>
            {/* <LoginImg alt="loginlogo" src={LoginLogo} /> */}
            LOGOUT
          </Loginbtn>
        ) : (
          <Loginbtn onClick={() => navigate("/login")}>
            {/* <LoginImg alt="loginlogo" src={LoginLogo} /> */}
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
  align-items: center;
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
  padding: 0 2rem;
  font-size: 1.7rem;
  &:link {
    transition: 1s;
    text-decoration: none;
  }
  &:hover {
    color: ${theme.colors.secondary};
    transition: all 0.3s ease-out;
  }
  &.active {
    color: ${theme.colors.secondary};
    position: relative;
    bottom: 0.1rem;
    transform: scale(1.1);
  }
`;
const Logo = styled.img`
  width: 10vw;
  :hover {
    cursor: pointer;
  }
`;
const Loginbtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  color: ${theme.colors.secondary};
  border: 0.2rem solid ${theme.colors.secondary};
  border-radius: 2rem;
  padding: 0.7rem 1.8rem;
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.extrabold};
  text-decoration: none;
  :hover {
    transform: scale(1.03);
    transition: all 0.3s ease-out;
    background: ${theme.colors.secondary};
    /* border-color: ${theme.colors.secondary}; */
    color: ${theme.colors.white};
    cursor: pointer;
  }
`;
const LoginImg = styled.img`
  height: 4vh;
  /* padding: 0 0.5rem 0 0; */
`;
