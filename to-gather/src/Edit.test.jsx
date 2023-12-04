import Edit from "./Edit";
import App from "./App";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Root from "./Root";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: () => ({
    title: "test",
    email: "test",
    type: "test",
    location: "test",
    groupsize: "Small (1-4)",
    description: "test",
    likes: 0,
    comments: [],
    id: 8,
  }),
}));

describe("Post Component Tests", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            title: "test",
            email: "test",
            type: "test",
            location: "test",
            groupsize: "Small (1-4)",
            description: "test",
            likes: 0,
            comments: [],
            id: 8,
          }),
      }),
    );
  });

  beforeEach(() => {
    fetch.mockClear();
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            title: "test",
            email: "test",
            type: "test",
            location: "test",
            groupsize: "Small (1-4)",
            description: "test",
            likes: 0,
            comments: [],
            id: 8,
          }),
      }),
    );
  });

  test("Delete button deletes the post", () => {
    const { getAllByTestId, getByLabelText, getByTestId, debug } = render(
      <MemoryRouter>
        <Edit />
      </MemoryRouter>,
    );

    const delButton = getByTestId("button-delete");

    fireEvent.click(delButton);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/posts/8", {
      method: "DELETE",
    });
    debug();
  });
});
