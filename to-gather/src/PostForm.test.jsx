import { render, fireEvent, getByLabelText } from "@testing-library/react";
import PostForm from "./PostForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("cannot submit empty form", () => {
  global.fetch = jest.fn();
  const { getAllByTestId } = render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PostForm />} />
      </Routes>
    </BrowserRouter>,
  );
  const submitButton = getAllByTestId("button-submit")[0];
  fireEvent.click(submitButton);
  expect(fetch).not.toHaveBeenCalled();
});

test("Cannot submit with one empty", () => {
  global.fetch = jest.fn();
  const { getAllByTestId, getByLabelText } = render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PostForm />} />
      </Routes>
    </BrowserRouter>,
  );
  const titleInput = getByLabelText("Title");
  const emailInput = getByLabelText("Email");
  const typeInput = getByLabelText("Type");
  const descriptionInput = getByLabelText("Description");
  const locationInput = getByLabelText("Location");
  const groupsizeSelect = getByLabelText("Group Size");

  userEvent.type(titleInput, "test");
  userEvent.type(emailInput, "test");
  userEvent.type(typeInput, "test");
  userEvent.type(locationInput, "test");
  // userEvent.type(descriptionInput, "test");
  userEvent.selectOptions(groupsizeSelect, "Small (1-4)");
  const submitButton = getAllByTestId("button-submit")[0];
  fireEvent.click(submitButton);
  expect(fetch).not.toHaveBeenCalled();
});

test("All filled should submit", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 1,
          name: "John Doe",
          email: "john@example.com",
        }),
    }),
  );
  const { getAllByTestId, getByLabelText } = render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PostForm />} />
      </Routes>
    </BrowserRouter>,
  );
  const titleInput = getByLabelText("Title");
  const emailInput = getByLabelText("Email");
  const typeInput = getByLabelText("Type");
  const descriptionInput = getByLabelText("Description");
  const locationInput = getByLabelText("Location");
  const groupsizeSelect = getByLabelText("Group Size");

  userEvent.type(titleInput, "test");
  userEvent.type(emailInput, "test");
  userEvent.type(typeInput, "test");
  userEvent.type(locationInput, "test");
  userEvent.type(descriptionInput, "test");
  userEvent.selectOptions(groupsizeSelect, "Small (1-4)");
  const submitButton = getAllByTestId("button-submit")[0];
  fireEvent.click(submitButton);

  expect(fetch).toHaveBeenCalledTimes(1);
});
