import React from "react";

const nextStatus = { "Todo": "In Progress", "In Progress": "Done", "Done": "Todo" };

export default function TaskItem({ task, onToggle }) {
  const formatDate = (d) => {
    if (!d) return "No due date";
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return d;
    }
  };

  return (
    <div className="task" role="listitem" tabIndex={0}>
      <strong>{task.title}</strong>
      <p>
        Status:{" "}
        <button
          onClick={() => onToggle(task.id)}
          className="link-btn"
          aria-label={`Toggle status for ${task.title} (current ${task.status})`}
        >
          {task.status}
        </button>
      </p>
      <p>
        Priority: {task.priority || "—"} • Assignee: {task.assignee || "—"} • Due: {formatDate(task.dueDate)}
      </p>
    </div>
  );
}
