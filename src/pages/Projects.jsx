import React, { useEffect, useMemo, useState } from "react";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("updated");

  useEffect(() => {
    async function load() {
      // try project locations
      const projectUrls = ["/projects.json", "/data/projects.json"];
      for (const u of projectUrls) {
        try {
          const r = await fetch(u);
          if (r.ok) {
            const data = await r.json();
            setProjects(data);
            break;
          }
        } catch (e) {}
      }

      // try common task files (optional)
      const taskUrls = ["/tasks.json", "/data/tasks.json"];
      for (const u of taskUrls) {
        try {
          const r = await fetch(u);
          if (r.ok) {
            const data = await r.json();
            setTasks(data);
            break;
          }
        } catch (e) {}
      }
    }
    load();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const projectsWithCounts = useMemo(() => {
    return projects.map((p) => {
      // prefer openTasks field if present in projects.json
      const openFromField = typeof p.openTasks === "number" ? p.openTasks : undefined;
      const openFromTasks = tasks.filter((t) => t.projectId === p.id && t.status !== "Done").length;
      const open = openFromField !== undefined ? openFromField : openFromTasks;
      return { ...p, open };
    });
  }, [projects, tasks]);

  const filtered = projectsWithCounts.filter((p) => {
    if (status !== "All" && p.status !== status) return false;
    if (debounced && !p.name.toLowerCase().includes(debounced.toLowerCase())) return false;
    return true;
  });

  const sorted = filtered.sort((a, b) => {
    if (sortBy === "updated") return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    return b.open - a.open;
  });

  return (
    <section>
      <h2>Projects</h2>
      <form aria-label="filters" className="filters" onSubmit={(e) => e.preventDefault()}>
        <label>
          Search
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Project name" />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Completed</option>
          </select>
        </label>
        <label>
          Sort by
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="updated">Last updated</option>
            <option value="open">Open tasks</option>
          </select>
        </label>
      </form>

      <div className="grid">
        {sorted.map((p) => <ProjectCard key={p.id} project={p} openTasks={p.open} />)}
        {sorted.length === 0 && <p>No projects match.</p>}
      </div>
    </section>
  );
}
