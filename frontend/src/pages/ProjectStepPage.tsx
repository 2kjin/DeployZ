import styled from "styled-components";
import StepSection from "@components/common/StepSection";
import Header from "@components/common/Header";
import FooterNav from "@components/common/FooterNav";
import { Outlet } from "react-router-dom";

export default function ProjectStepPage() {
  return (
    <>
      <Header />
      <Container>
        <StepSection />
        <Outlet />
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
