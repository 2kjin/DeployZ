import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { theme } from "@/styles/theme";

export default function Page404() {
  const navigate = useNavigate();

  return (
    <>
      <Background>
        <Top>
          <H1>404</H1>
          <H3>page not found</H3>
        </Top>
        <Container>
          <Ghostcopy>
            <One></One>
            <Two></Two>
            <Three></Three>
            <Four></Four>
          </Ghostcopy>
          <Ghost>
            <Face>
              <Eye></Eye>
              <Eyeright></Eyeright>
              <Mouth></Mouth>
            </Face>
          </Ghost>
          <Shadow></Shadow>
        </Container>
        <Bottom>
          <P>Boo, looks like a ghost stole this page!</P>
          <Buttons>
            <Btn onClick={() => navigate("/")}>Home</Btn>
            <Btn onClick={() => navigate("/aboutus")}>About Us</Btn>
            {/* <Btn onClick={GoCB}>Cherry Blossoms</Btn> */}
          </Buttons>
        </Bottom>
      </Background>
    </>
  );
}

const scale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const float = keyframes`
  50% {
     transform: translateY(15px);
  }
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${theme.colors.primary};
  width: 100vw;
  height: 100vh;
`;
const Top = styled.div``;
const H1 = styled.h1`
  text-align: center;
  font-size: 9em;
  margin: 2rem;
  color: ${theme.colors.secondary};
`;
const H3 = styled.h3`
  font-family: "Lato", sans-serif;
  font-size: 2em;
  text-transform: uppercase;
  text-align: center;
  color: ${theme.colors.secondary};
  margin-top: -20px;
  font-weight: 900;
`;
const Container = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  margin-top: -3rem;
`;
const Ghostcopy = styled.div`
  width: 50%;
  height: 53%;
  left: 25%;
  top: 10%;
  position: absolute;
  border-radius: 50% 50% 0 0;
  background: #ededed;
  border: 1px solid #bfc0c0;
  border-bottom: none;
  animation: ${float} 2s ease-out infinite;
  z-index: 0;
`;
const One = styled.div`
  position: absolute;
  background: #ededed;
  top: 85%;
  width: 25%;
  height: 23%;
  border: 1px solid #bfc0c0;
  z-index: 0;
  border-radius: 0 0 100% 30%;
  left: -1px;
`;
const Two = styled.div`
  position: absolute;
  background: #ededed;
  top: 85%;
  width: 25%;
  height: 23%;
  border: 1px solid #bfc0c0;
  z-index: 0;
  left: 23%;
  border-radius: 0 0 50% 50%;
`;
const Three = styled.div`
  position: absolute;
  background: #ededed;
  top: 85%;
  width: 25%;
  height: 23%;
  border: 1px solid #bfc0c0;
  z-index: 0;
  left: 50%;
  border-radius: 0 0 50% 50%;
`;
const Four = styled.div`
  position: absolute;
  background: #ededed;
  top: 85%;
  width: 25%;
  height: 23%;
  border: 1px solid #bfc0c0;
  z-index: 0;
  left: 74.5%;
  border-radius: 0 0 30% 100%;
`;
const Ghost = styled.div`
  width: 50%;
  height: 53%;
  left: 25%;
  top: 10%;
  position: absolute;
  border-radius: 50% 50% 0 0;
  background: #ededed;
  border: 1px solid #bfc0c0;
  border-bottom: none;
  animation: ${float} 2s ease-out infinite;
`;
const Face = styled.div`
  position: absolute;
  width: 100%;
  height: 60%;
  top: 20%;
`;
const Eye = styled.div`
  position: absolute;
  background: #585959;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  top: 40%;
  left: 25%;
`;
const Eyeright = styled.div`
  position: absolute;
  background: #585959;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  top: 40%;
  right: 25%;
`;
const Mouth = styled.div`
  position: absolute;
  top: 50%;
  left: 45%;
  width: 10px;
  height: 10px;
  border: 3px solid;
  border-radius: 50%;
  border-color: transparent #585959 #585959 transparent;
  transform: rotate(45deg);
`;
const Shadow = styled.div`
  position: absolute;
  width: 30%;
  height: 7%;
  background: #bfc0c0;
  left: 35%;
  top: 80%;
  border-radius: 50%;
  animation: ${scale} 2s infinite;
`;
const Bottom = styled.div`
  margin: 1rem;
`;
const P = styled.div`
  text-align: center;
  font-family: "Lato", sans-serif;
  color: ${theme.colors.secondary};
  font-size: 1.5em;
  margin-top: -20px;
  text-transform: uppercase;
  font-weight: ${theme.fontWeight.semibold};
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
`;
const Btn = styled.div`
  padding: 1.5rem 2.3rem;
  margin: 1rem;
  color: #ededed;
  font-weight: ${theme.fontWeight.semibold};
  font-family: "Lato", sans-serif;
  text-transform: uppercase;
  font-size: 0.6em;
  letter-spacing: 1px;
  border-radius: 1rem;
  border-color: #ededed;
  border: 1px solid #ededed;
  &:hover {
    background: #ededed;
    color: ${theme.colors.primary};
    transition: all 0.4s ease-out;
    cursor: pointer;
  }
`;
