import styled from "styled-components";
import Landing from "@components/Landing/Landing";

export default function LandingPage() {
  return (
    <>
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
