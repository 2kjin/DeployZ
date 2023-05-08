import styled from "styled-components";
import VideoLanding from "@components/Landing/VideoLanding";

export default function LandingPage() {
  return (
    <>
    <Container>
      <VideoLanding />
    </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  overflow: auto;
`;
