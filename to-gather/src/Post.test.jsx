import { render, fireEvent } from "@testing-library/react";
import Post from "./Post";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useLoaderData } from "react-router-dom";

// Mock outside the test
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

  test("Cannot submit empty comment", () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>,
    );

    const submitButton = getAllByTestId("button-submit")[0];
    fireEvent.click(submitButton);
    expect(fetch).not.toHaveBeenCalled();
  });

  test("Cannot submit when one empty", () => {
    const { getAllByTestId, getByLabelText } = render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>,
    );

    const emailInput = getByLabelText("Email:");
    userEvent.type(emailInput, "what@who.com");

    const submitButton = getAllByTestId("button-submit")[0];
    fireEvent.click(submitButton);
    expect(fetch).not.toHaveBeenCalled();
  });

  test("Submit when both filled", () => {
    const { getAllByTestId, getByLabelText, getByTestId, debug } = render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>,
    );

    const emailInput = getByLabelText("Email:");
    const commentInput = getByTestId("new-comment");

    userEvent.type(emailInput, "what@who.com");
    userEvent.type(commentInput, "test comment");

    const submitButton = getAllByTestId("button-submit")[0];

    fireEvent.click(submitButton);

    expect(fetch).toHaveBeenCalledTimes(1);
    debug();
  });
});
