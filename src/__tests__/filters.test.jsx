import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Projects from "../pages/Projects";

const projects = [
  { id: "a", name: "Alpha", owner: "X", status: "Active", lastUpdated: "2025-01-01T00:00:00Z" },
  { id: "b", name: "Beta", owner: "Y", status: "Paused", lastUpdated: "2025-01-02T00:00:00Z" }
];
const tasks = [];

beforeEach(() => {
  global.fetch = (url) => {
    if (url.includes("projects.json")) return Promise.resolve({ json: () => Promise.resolve(projects) });
    if (url.includes("tasks.json")) return Promise.resolve({ json: () => Promise.resolve(tasks) });
    return Promise.resolve({ json: () => Promise.resolve([]) });
  };
});

test("filters by status", async () => {
  render(<MemoryRouter><Projects /></MemoryRouter>);
  await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());
  fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: "Paused" } });
  expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
  expect(screen.getByText("Beta")).toBeInTheDocument();
});
