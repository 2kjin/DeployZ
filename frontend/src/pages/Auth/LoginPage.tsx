import styled from "styled-components";
import LoginSecetion from "@components/Auth/LoginSection";
import Header from "@components/common/Header";

export default function LoginPage() {
  return (
    <>
      <Header type="standard" />
      <Container>
        <LoginSecetion />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 93vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
