import styled from "styled-components";
import Header from "@components/common/Header";
import Landing from "@components/Landing/Landing";

export default function LandingPage() {

  return (
    <>
    <Header/>
    <Container>
      <Landing/>
    </Container>
    </>
  );
}

const Container = styled.div`
  height: 93vh;
  overflow: auto;
`;
