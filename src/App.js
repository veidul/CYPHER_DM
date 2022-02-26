import React from "react";
import "./assets/css/output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <div className="dark:bg-gray-900 dark:text-gray-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
