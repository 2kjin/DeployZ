import { useState, useEffect } from 'react';
import styled from "styled-components";
import { theme } from "@/styles/theme"

export default function ThreejsTest() {

  return (
  <Container>
  </Container>
  )
}

const Container = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
  height : 93vh;
  width : 100vw;
  background-color : ${theme.colors.white};
`