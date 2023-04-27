import styled from "styled-components";
import Header from "@components/common/Header";
import Intro1 from "@components/Landing/Intro1";
import Intro2 from "@components/Landing/Intro2";
import Intro3 from "@components/Landing/Intro3";
import Intro4 from "@components/Landing/Intro4";
import Footer from "@components/common/Footer";

export default function IntroPage() {

  return (
    <>
    <Header/>
    <Container>
      <Intro1/>
      <Intro2/>
      <Intro3/>
      <Intro4/>
      <Footer/>
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
