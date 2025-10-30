import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, openTasks }) {
  return (
    <article className="card" aria-labelledby={`proj-${project.id}`}>
      <h3 id={`proj-${project.id}`}>{project.name}</h3>
      <p>Owner: {project.owner}</p>
      <p>Status: {project.status}</p>
      <p>Last updated: {new Date(project.lastUpdated).toLocaleString()}</p>
      <p>Open tasks: {openTasks}</p>
      <Link to={`/projects/${project.id}`} className="btn">Open</Link>
    </article>
  );
}
