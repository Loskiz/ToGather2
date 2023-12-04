import { useState } from "react";
import { Link } from "react-router-dom";

export default function PostCard(props) {
  const id = props.id;
  const [likes, setLikes] = useState(props.likes);
  const [liked, setLiked] = useState(false);
  return (
    <div className="container col-8 card">
      <div className="row">
        <div className="col">
          <h4>{props.title}</h4>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h5>Posted By: </h5>
          <p>{props.email}</p>
        </div>
        <div className="col">
          <h5>Type: </h5>
          <p>{props.type}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h5>Location: </h5>
          <p>{props.location}</p>
        </div>
        <div className="col">
          <h5>Group Size: </h5>
          <p>{props.groupsize}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6"></div>
        <div className="col">
          <h5>likes: {likes}</h5>
        </div>
      </div>
      <div className="row">
        <button className="btn border col" test-dataid="details">
          <Link to={`/posts/${props.id}`}>Details</Link>
        </button>
        <button
          className="btn like border col"
          onClick={() => {
            if (!liked) {
              fetch(`http://localhost:3001/posts/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  likes: props.likes + 1,
                }),
              });
              setLikes(likes + 1);
              setLiked(true);
            }
          }}
        >
          Like
        </button>
      </div>
    </div>
  );
}
