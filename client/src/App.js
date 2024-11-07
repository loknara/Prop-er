import React, { useEffect } from "react";
import Dashboard from "./pages/dashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/navbar.jsx";
import executeInDevMode from "@speckai/paige";




export default function App() {
  useEffect(() => {
    executeInDevMode();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <div className="mt-16 bg-gray-300 h-[92dvh]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
