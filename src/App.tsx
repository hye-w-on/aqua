import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import SocialRedirectHandler from "./pages/social";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/oauth/:socialPlatform"
          element={<SocialRedirectHandler />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
