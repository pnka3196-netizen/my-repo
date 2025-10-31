import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import { useDarkMode } from "./hooks/useDarkMode";

export default function App() {
  const { dark, toggle } = useDarkMode();
  return (
    <div className="app">
      <header className="topbar">
        <h1 className="logo"><Link to="/">Projects</Link></h1>
        <nav>
          <Link to="/projects">All Projects</Link>
          <button onClick={toggle} aria-pressed={!dark} className="btn-toggle">
            {dark ? "Dark" : "Light"}
          </button>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
    </div>
  );
}
