import { useState } from "react";
import styled from "styled-components";
import Header from "@components/common/Header";
import Landing1 from "../components/Landing/Landing1";

export default function LandingPage() {
  return (
    <>
      <Header/>
      <Container>
        <Landing1/>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 93vh;
`;
