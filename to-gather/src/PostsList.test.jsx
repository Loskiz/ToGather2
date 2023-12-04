import PostsList from "./PostsList";
import { render, fireEvent, getAllByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";

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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
    },
  ],
}));

test("PostCards renders", () => {
  const { getAllByTestId } = render(
    <MemoryRouter initialEntries={["/posts"]}>
      <Routes>
        <Route path="/posts" element={<PostsList />} />
      </Routes>
    </MemoryRouter>,
  );

  const postcards = getAllByTestId("postcard");
  expect(postcards.length).toBe(6);
});
