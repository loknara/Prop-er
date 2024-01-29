import React from "react";
import Dashboard from "./pages/dashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/navbar.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
