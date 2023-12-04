import { Link, useLoaderData, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Post() {
  const post = useLoaderData();

  const [newCommentEmail, setNewCommentEmail] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = `${post.title}`;
  }, []);

  return (
    <div className="container justify-content-center align-items-center">
      <div className="row justify-content-center text-center">
        <div className="col-12">
          <h2>{post.title}</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <h4>Posted By: {post.email}</h4>
        </div>
        <div className="col-8">
          <h4>Type: {post.type}</h4>
        </div>
        <div className="col-8">
          <h4>Location: {post.location}</h4>
        </div>
        <div className="col-8">
          <h4>Group Size: {post.groupsize}</h4>
        </div>
        <div className="col-8">
          <h4>Likes: {post.likes}</h4>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-8">
          <h4>Description: </h4>
          {post.description}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8 mt-3">
          <div className="col-2">
            <button className="btn btn-danger">
              <Link to={`/edit/${post.id}`}>Edit Post</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-6">
        <div className="col-8 mt-5">
          <h4>Comments</h4>
          <div>
            {comments.map((comment) => {
              return (
                <div key={comment.content} className="card">
                  <div className="card-body">
                    <h5 className="card-title">Email: {comment.email}</h5>
                    <span className="card-text">{comment.content}</span>
                    <p className="mt-3">{comment.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <form
        className="row justify-content-center"
        onSubmit={(event) => {
          event.preventDefault();
          const url = `http://localhost:3001/posts/${post.id}`;
          const timestamp = new Date();
          const date = timestamp.toLocaleDateString();

          const newCommentObj = {
            email: newCommentEmail,
            content: newComment,
            timestamp: date,
          };
          if (newCommentEmail.trim() && newComment.trim()) {
            fetch(url, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                comments: [newCommentObj, ...post.comments],
              }),
            })
              .then((response) => {
                if (response.ok) {
                  toast.success("Comment Posted");
                  return response.json();
                } else {
                  toast.error("Error in submitting comment");
                }
              })
              .then((data) => {
                setComments(data.comments);
                setNewComment("");
                setNewCommentEmail("");
              });
          } else {
            toast.error("Please make sure all fields are filled");
          }
        }}
      >
        <div className="col-8 mt-5">
          <div>
            <h5>Add a new Comment: </h5>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <label className="form-label" htmlFor="new-comment-email">
                Email:
              </label>
              <input
                className="form-control col-3"
                name="new-comment-email"
                id="new-comment-email"
                data-testid="new-comment-email"
                value={newCommentEmail}
                onChange={(event) => {
                  setNewCommentEmail(event.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <textarea
                className="form-control col-5"
                id="new-comment"
                name="new-comment"
                data-testid="new-comment"
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <button
            className="btn btn-primary col-2"
            type="submit"
            id="buttom-submit"
            data-testid="button-submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
