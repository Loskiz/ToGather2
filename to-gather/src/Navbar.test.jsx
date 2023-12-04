import Navbar from "./Navbar";
import PostsList from "./PostsList";
import App from "./App";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Root from "./Root";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: () => [
    {
      title: "ITP 404",
      email: "zhanglt2002@outlook.com",
      type: "Gathering",
      location: "USC",
      groupsize: "3",
      description: "desc",
      likes: 3,
      comments: [
        {
          email: "letianz@usc.edu",
          content: "Nice Post",
        },
        {
          email: "zhanglt2002@outlook.com",
          content: "Great Post! ",
        },
      ],
      id: 1,
    },
    {
      title: "",
      email: "",
      type: "",
      location: "",
      groupsize: "Small (1-4)",
      description: "",
      likes: 6,
      id: 3,
    },
    {
      title: "Appreciating Roses",
      email: "what@who.com (Edited)",
      type: "Social Event",
      location: "Rose Garden",
      groupsize: "Medium (5-12)",
      description: "Come see the roses at Rose Garden! ",
      likes: 1,
      comments: [],
      id: 4,
    },
    {
      title: "Library Tour",
      email: "zhanglt2002@outlook.com",
      type: "Tour",
      location: "Leavy Library",
      groupsize: "Medium (5-12)",
      description: "Come Join us at the library",
      likes: 0,
      comments: [],
      id: 5,
    },
    {
      title: "Library Tour 2",
      email: "zhanglt2002@outlook.com",
      type: "Tour",
      location: "USC Leavy Library",
      groupsize: "Medium (5-12)",
      description: "Come join us in the tour! ",
      likes: 0,
      comments: [
        {
          email: "new@what.com",
          content: "Awesome! ",
          timestamp: "12/3/2023",
        },
        {
          email: "zhanglt2002@outlook.com",
          content: "Great! ",
          timestamp: "12/3/2023",
        },
        {
          email: "who@what.com",
          content: "Cool! ",
          timestamp: "12/3/2023",
        },
      ],
      id: 7,
    },
    {
      title: "test",
      email: "test",
      type: "test",
      location: "test",
      groupsize: "Small (1-4)",
      description: "test",
      likes: 0,
      comments: [
        {
          email: "zhanglt2002@outlook.com",
          content: "Comments",
          timestamp: "12/3/2023",
        },
      ],
      id: 8,
    },
  ],
}));

test("Clicking on brand takes user home", () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<App />} />
          <Route path="/posts" element={<PostsList />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

  const brand = getByTestId("brand");
  const slogan = getByText("An App for hanging out with elegance");
  fireEvent.click(brand);
  expect(slogan).toBeInTheDocument();
});
