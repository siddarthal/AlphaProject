import React, { useState } from "react";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  const [sign, setSign] = useState(false);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
