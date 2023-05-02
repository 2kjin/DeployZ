import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

export default function Intro2() {
  return (
    <Container>
      <div className="left-container">
        <h1>이미지</h1>
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
    height: 100%;
    width: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-container {
    height: 100%;
    width: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
