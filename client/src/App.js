import React from "react";
import Dashboard from "./components/dashboard.jsx";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
