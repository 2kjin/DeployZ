import styled from "styled-components";
import InputSection from "@components/CreateProject/InputSection2";
import StepSection from "@components/common/StepSection";
import Header from "@components/common/Header";
import FooterNav from "@components/common/FooterNav";

export default function ProjectStepPage() {
  return (
    <>
      <Header />
      <Container>
        <StepSection />
        <InputSection />
      </Container>
      <FooterNav />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 85vh;
`;
