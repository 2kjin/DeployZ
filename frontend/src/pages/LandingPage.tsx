import styled from "styled-components";
import Header from "@components/common/Header";
import Landing from "@components/Landing/Landing";
import { useState } from "react";

export default function LandingPage() {
  // Header type 설정
  const [type, setType] = useState<string>("standard");

  return (
    <>
      <Header type={type} />
      <Container>
        <Landing />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 93vh;
  overflow: auto;
`;
