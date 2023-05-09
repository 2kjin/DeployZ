import styled from "styled-components";
import { theme } from "@/styles/theme"
import Intro3Compo from "./Intro3Compo";
import { useRef } from "react";

export default function Intro3() {
  const size = useRef<HTMLDivElement>(null);
  return (
    <Container>
      <div ref={size} className="left-container" >
        <Intro3Compo size={size} />
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
