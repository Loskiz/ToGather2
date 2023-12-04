import { useState, useEffect } from "react";
import PostForm from "./PostForm";

export default function CreatePost() {
  useEffect(() => {
    document.title = "Make a Post";
  }, []);
  return <PostForm />;
}
