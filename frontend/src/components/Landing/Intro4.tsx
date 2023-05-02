import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";
import Footer from "@components/common/Footer";

export default function Intro4() {
  return (
    <>
      <Container>
        <div className="title-container">
          <Title>
            <span style={{ fontWeight: `${theme.fontWeight.extrabold}` }}>
              자 동 배 포
            </span>
          </Title>
          <Title>
            지금 바로
            <span style={{ fontWeight: `${theme.fontWeight.extrabold}` }}>
              &nbsp;'경험'&nbsp;
            </span>
            해보세요
          </Title>
        </div>
        <Guidebtn>START</Guidebtn>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 65vh;
  width: 100%;
  background-color: ${theme.colors.primary};
  .title-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Title = styled.div`
  color: ${theme.colors.white};
  font-size: 4rem;
`;
const Guidebtn = styled.div`
  background: none;
  border-radius: 15rem;
  border: 0.3rem solid ${theme.colors.white};
  color: ${theme.colors.white};
  padding: 1rem 10rem;
  font-size: 2.5rem;
  margin: 5rem;
  font-weight: 700;
  :hover {
    background: ${theme.colors.white};
    border-color: ${theme.colors.white};
    color: ${theme.colors.primary};
    transition: all 0.4s ease-out;
    cursor: pointer;
  }
`;
