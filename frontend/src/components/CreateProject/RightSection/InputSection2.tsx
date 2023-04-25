import { theme } from "@/styles/theme";
import styled from "styled-components";
import ItemBox from "./Chapter2/ItemBox";

export default function InputSection2() {
  return (
    <Container>
      <p className="subject">Item 정보 입력</p>
      <ItemBox itemName="Front-end" />
      <ItemBox itemName="Back-end" />
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  /* background-color: ${theme.colors.container}; */
  flex: 4;
  margin: 2rem 1.5rem;
  border-radius: 1rem;
  padding: 1.5rem;
  color: ${theme.colors.primary};

  .subject {
    font-size: 3.7rem;
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
