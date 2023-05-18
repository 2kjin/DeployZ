import styled from "styled-components";
import PersonalToken from "@components/Auth/PersonalToken";

export default function SignupPage() {
  return (
    <>
      <Container>
        <PersonalToken />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  overflow: auto;
`;
