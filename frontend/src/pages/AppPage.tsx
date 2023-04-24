import { useState } from "react";
import styled from "styled-components";
import Header from "@components/common/Header";

function App() {
  const [test, setTest] = useState("Test");
  const tempFunc = (a: number, b: number) => {
    return a + b;
  };

  return (
    <>
      <Header/>
      <h1>A402</h1>
      <h2>{test}</h2>
      <div>result : {tempFunc(1, 2)}</div>
    </>
  );
}

export default App;
