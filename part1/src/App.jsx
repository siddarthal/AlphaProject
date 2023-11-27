import React, { useState } from "react";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
function App() {
  const [sign, setSign] = useState(false);
  return (
    <>
      {sign?<Signin name={setSign} />:<Signup name={setSign}/>}
    </>
  );
}

export default App;
