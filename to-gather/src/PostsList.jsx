import PostCard from "./PostCard";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export default function PostsList() {
  const posts = useLoaderData().reverse();
  useEffect(() => {
    document.title = "See Posts";
  }, []);
  return (
    <div className="container justify-content-center align-items-center">
      <div className="row">
        {posts.map((post) => {
          return (
            <div key={post.id} data-testid="postcard">
              <PostCard
                id={post.id}
                title={post.title}
                email={post.email}
                type={post.type}
                groupsize={post.groupsize}
                location={post.location}
                likes={post.likes}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
