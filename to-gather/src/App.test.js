import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import { MemoryRouter, Routes, Route } from "react-router-dom";

test("Cards render", () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getAllByTestId("card").length).toBe(2);
});
