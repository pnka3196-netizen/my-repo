import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        // try multiple locations for projects.json
        const tryUrls = ["/projects.json"];
        let res = null;
        for (const u of tryUrls) {
          try {
            res = await fetch(u);
            if (res.ok) {
              const data = await res.json();
              if (mounted) setProjects(data);
              return;
            }
          } catch (e) {
            // try next
          }
        }
        throw new Error("projects.json not found");
      } catch (err) {
        if (mounted) setError(err.message);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (error)
    return (
      <section>
        <h2>Projects</h2>
        <p role="alert">Error loading projects: {error}</p>
        <p>
          <Link to="/projects">Go to Projects page</Link>
        </p>
      </section>
    );

  if (!projects)
    return (
      <section>
        <h2>Projects</h2>
        <p>Loading projects…</p>
      </section>
    );

  return (
    <section>
      <h2>Projects</h2>
      <p>A quick list of projects (from projects.json)</p>
      <ul aria-label="projects list">
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.owner} —{" "}
            <span aria-hidden="true">{p.status}</span> (
            <Link to={`/projects/${p.id}`}>Open</Link>)
          </li>
        ))}
      </ul>
      <p>
        <Link to="/projects">View all projects</Link>
      </p>
    </section>
  );
}
