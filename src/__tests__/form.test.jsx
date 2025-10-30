import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskForm";

test("shows validation when title empty", () => {
  const onAdd = jest.fn();
  render(<TaskForm projectId="p1" onAdd={onAdd} />);
  fireEvent.click(screen.getByText("Add"));
  expect(screen.getByRole("alert")).toBeInTheDocument();
  expect(onAdd).not.toHaveBeenCalled();
});
