import React, { useState } from "react";

export default function TaskForm({ projectId, onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    const newTask = {
      id: "t_" + Date.now().toString(36),
      projectId,
      title: title.trim(),
      status: "Todo",
      priority,
      assignee,
      dueDate
    };
    onAdd(newTask);
    // reset
    setTitle("");
    setPriority("Medium");
    setAssignee("");
    setDueDate("");
    setError("");
  }

  return (
    <form onSubmit={submit} aria-label="add-task">
      <h4>Add Task</h4>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Priority
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </label>
      <label>
        Assignee
        <input value={assignee} onChange={(e) => setAssignee(e.target.value)} />
      </label>
      <label>
        Due date
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>
      {error && <p role="alert" className="error">{error}</p>}
      <button type="submit" className="btn">Add</button>
    </form>
  );
}
