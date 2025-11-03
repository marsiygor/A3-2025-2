import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Occurrences from "./pages/Occurrences";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar  style={{
          height: '100vh',
        }}/>
        <div
          className="flex-grow-1 p-4 bg-light"
          style={{ minHeight: "100vh", width: "calc(100vw - 240px)" }}
        >
          <Routes>
            <Route path="/ocorrencias" element={<Occurrences />} />
            <Route path="/" element={<Dashboard />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
