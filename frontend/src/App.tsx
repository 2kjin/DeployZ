import { useState } from "react";

function App() {
  const [test, setTest] = useState("Test");
  const tempFunc = (a: number, b: number) => {
    return a + b;
  };

  return (
    <>
      <h1>A402</h1>
      <h2>{test}</h2>
      <div>result : {tempFunc(1, 2)}</div>
    </>
  );
}

export default App;
