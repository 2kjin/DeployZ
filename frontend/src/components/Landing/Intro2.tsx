import styled from "styled-components";
import { theme } from "@/styles/theme"
import Intro2Compo from "./Intro2Compo";
import { useRef } from "react";

export default function Intro2() {
  const size = useRef<HTMLDivElement>(null);
  return (
    <Container>
      <div ref={size} className="left-container">
        <Intro2Compo size={size} />
      </div>
      <div className="right-container"></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 93vh;
  width: 100%;
  background-color: ${theme.colors.container};
  .left-container {
    width: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-container {
    width: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
