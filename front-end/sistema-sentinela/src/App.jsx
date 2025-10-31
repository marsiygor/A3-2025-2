import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Occurrences from "./pages/Occurrences";

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: "100vh", width: "calc(100vw - 240px)" }}>
          <Routes>
            <Route path="/ocorrencias" element={<Occurrences />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
