import styled from "styled-components";
import Header from "@components/common/Header";
import PersonalToken from "@components/Auth/PersonalToken";

export default function SignupPage() {
  
  return (
    <>
    <Header type="standard" />
    <Container>
      <PersonalToken/>
    </Container>
    </>
  );
}

const Container = styled.div`
  height: 93vh;
  overflow: auto;
`;
