import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PersonDetail from "./pages/PersonDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people/:id" element={<PersonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
