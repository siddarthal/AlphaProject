import React, { useState } from "react";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Mainpage from "./components/Mainpage.jsx";
import {  Routes, Route, Navigate } from "react-router-dom";
function App({}) {
  const accessToken = localStorage.getItem("accessToken");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => {
    setLoggedIn(true);
  };
  const handleLogout = () => {
    setLoggedIn(false);
  };

  console.log("accessToken", accessToken);
  // setTimeout(() => localStorage.setItem("accessToken", ""), 10000);
  return (
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
        {isLoggedIn ? (
          <Route path="/main" element={<Mainpage onLogout={handleLogout} />} />
        ) : (
          <Route path="/main" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
