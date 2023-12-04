import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import Post from "./Post";
import Edit from "./Edit";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/createpost",
        element: <CreatePost />,
      },
      {
        path: "/posts",
        element: <PostsList />,
        loader() {
          return fetch("http://localhost:3001/posts").then((response) => {
            console.log(response);
            return response;
          });
        },
      },
      {
        path: "/posts/:postid",
        element: <Post />,
        loader({ params }) {
          return fetch(`http://localhost:3001/posts/${params.postid}`);
        },
      },
      {
        path: "edit/:postid",
        element: <Edit />,
        loader({ params }) {
          return fetch(`http://localhost:3001/posts/${params.postid}`);
        },
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
