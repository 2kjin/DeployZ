import styled from "styled-components";
import { theme } from "@/styles/theme"
import Intro1Compo from "./Intro1Compo";
import { useRef } from "react";
import ZoomInOut from "./Intro1Compo copy";

export default function Intro1() {
  const size = useRef<HTMLDivElement>(null);
  return (
    <Container>
      <div ref={size} className="left-container">
        <ZoomInOut size={size} />
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
  }
  .right-container {
    width: 35%;
    display: flex;
  }
`;
