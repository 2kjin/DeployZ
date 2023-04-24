import { theme } from "@/styles/theme";
import styled from "styled-components";

export default function InputSection2() {
  return <Container>인풋2</Container>;
}

const Container = styled.div`
  background-color: #fff;
  /* background-color: ${theme.colors.container}; */
  flex: 4;
  margin: 2rem 1.5rem;
  border-radius: 1rem;
  padding: 1.5rem;
`;
