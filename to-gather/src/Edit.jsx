import { useEffect } from "react";
import PostForm from "./PostForm";
import { useLoaderData } from "react-router-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Edit() {
  const post = useLoaderData();
  const nav = useNavigate();
  useEffect(() => {
    document.title = `Edit Post ${post.title}`;
  }, []);
  return (
    <>
      <PostForm obj={post}></PostForm>
      <div className="container justify-content-center">
        <button
          className="btn btn-danger"
          data-testid="button-delete"
          onClick={() => {
            fetch(`http://localhost:3001/posts/${post.id}`, {
              method: "DELETE",
            }).then((response) => {
              if (response.ok) {
                toast.success("Post deleted", {
                  onClose: nav("/posts"),
                });
              } else {
                console.error("Error in deletion");
              }
            });
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
