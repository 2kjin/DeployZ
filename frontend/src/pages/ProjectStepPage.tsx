import styled from "styled-components";
import StepSection from "@components/CreateProject/LeftSection/StepSection";
import Header from "@components/common/Header";
import FooterNav from "@components/common/FooterNav";
import { useRecoilValue } from "recoil";
import { chapterState } from "@/recoil/step";
import InputSection1 from "@components/CreateProject/RightSection/InputSection1";
import InputSection2 from "@components/CreateProject/RightSection/InputSection2";
import InputSection3 from "@components/CreateProject/RightSection/InputSection3";
import InputSection4 from "@components/CreateProject/RightSection/InputSection4";

export default function ProjectStepPage() {
  const currentChapter = useRecoilValue(chapterState);

  return (
    <>
      <Header type="standard" />
      <Container>
        <StepSection />
        {/* <Outlet /> */}
        {currentChapter == 1 && <InputSection1 />}
        {currentChapter == 2 && <InputSection2 />}
        {currentChapter == 3 && <InputSection3 />}
        {currentChapter == 4 && <InputSection4 />}
      </Container>
      <FooterNav />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 85vh;
  padding: 0 7%;
`;
