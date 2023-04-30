import styled from "styled-components";
import Header from "@components/common/Header";
import ThreejsTest from "@/components/Landing/ThreejsTest";

export default function ThreejstestPage() {
  return (
    <>
      <Header />
      <Container>
        <ThreejsTest />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 93vh;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
