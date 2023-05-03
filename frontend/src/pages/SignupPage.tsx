import styled from "styled-components";
import Header from "@components/common/Header";
import PersonalToken from "@components/Auth/PersonalToken";
import { useState } from "react";

export default function SignupPage() {
  // Header type 설정
  const [type, setType] = useState<string>("standard");
  
  return (
    <>
    <Header type={type} />
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
