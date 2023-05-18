import styled from "styled-components";
import Header from "@components/common/Header";
import InfraGuideCompo from "@components/Guide/InfraGuideCompo";

export default function InfraGuidePage() {
  return (
    <>
      <Header type="standard" />
      <Container>
        <InfraGuideCompo />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 93vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
