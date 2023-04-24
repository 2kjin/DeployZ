import { useState } from "react";
import styled from "styled-components";
import Header from "@components/common/Header";
import LandingPage from "./LandingPage";

function App() {
  const [test, setTest] = useState("Test");
  const tempFunc = (a: number, b: number) => {
    return a + b;
  };

  return (
    <>
      <Header/>
      <LandingPage/>
    </>
  );
}

export default App;
