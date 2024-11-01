import React from "react";
import Dashboard from "./pages/dashboard.jsx";
import OddsComparison from "./pages/OddsComparison.jsx";
import About from "./pages/About.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/navbar.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/odds" element={<OddsComparison />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
