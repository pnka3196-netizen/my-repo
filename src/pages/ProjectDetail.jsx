import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";

const statuses = ["Todo", "In Progress", "Done"];

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // helper to try multiple urls
    async function tryFetchJson(urls) {
      for (const u of urls) {
        try {
          const r = await fetch(u);
          if (r.ok) return r.json();
        } catch (e) {}
      }
      return null;
    }

    async function load() {
      // projects may live at root or /data
      const projects = await tryFetchJson(["/projects.json", "/data/projects.json"]);
      if (projects) {
        setProject(projects.find((p) => p.id === id));
      }

      // try per-project task files and common task files
      const normalized = id.replace(/^p-?/, "p-"); // ensure p- prefix style
      const candidates = [
        `/tasks-${id}.json`,
        `/tasks-${normalized}.json`,
        `/tasks-${id.replace(/p-?/, "p")}.json`,
        `/data/tasks-${id}.json`,
        "/tasks.json",
        "/data/tasks.json"
      ];
      const found = await tryFetchJson(candidates);
      if (found && Array.isArray(found)) {
        // If tasks in the file include projectId entries, filter by id.
        const hasProjectId = found.some((t) => t && (t.projectId !== undefined));
        const arr = hasProjectId
          ? found.filter((t) => t.projectId === id || t.projectId === normalized)
          : found; // assume file is per-project when no projectId fields present
        setTasks(arr);
      } else {
        // no tasks file found — leave tasks empty
        setTasks([]);
      }
    }

    load();
  }, [id]);

  function toggleTask(taskId) {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: statuses[(statuses.indexOf(t.status) + 1) % statuses.length] } : t)));
  }

  function addTask(task) {
    setTasks((prev) => [task, ...prev]);
  }

  if (!project) return <p>Loading...</p>;

  return (
    <section>
      <p><Link to="/projects">← Back to projects</Link></p>
      <h2>{project.name}</h2>
      <p>Owner: {project.owner} • Status: {project.status}</p>
      <p>Last updated: {new Date(project.lastUpdated).toLocaleString()}</p>

      <TaskForm projectId={id} onAdd={addTask} />

      <h3>Tasks</h3>
      <div role="list" className="tasks">
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map((t) => <TaskItem key={t.id} task={t} onToggle={toggleTask} />)}
      </div>
    </section>
  );
}
