import Header from "@components/common/Header";
import SignUpSection from "@/components/Auth/SignUpSection";
import styled from "styled-components";

export default function SignUpPage() {
  return (
    <>
      <Header type="standard" />
      <Container>
        <SignUpSection />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 93vh;
`;
