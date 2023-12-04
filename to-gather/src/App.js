import logo from "./logo.svg";
import "./App.css";
import imgPosts from "./img/posts.jpg";
import imgComments from "./img/comment.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  useEffect(() => {
    document.title = "About Page";
  }, []);

  return (
    <div className="App container justify-content-center align-items-center">
      <div className="row">
        <div className="col">
          <h1>ToGather</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h4>An App for hanging out with elegance</h4>
        </div>
      </div>
      <div className="row justify-content-around mt-5">
        <div className="col-1"></div>
        <div className="card col-4" data-testid="card">
          <img
            src={imgPosts}
            alt="image about posts"
            className="card-img-top"
          ></img>
          <div className="card-body">
            <h5 className="card-title">Make a Post</h5>
            <p className="card-text">
              Post about a activity you want others to join
            </p>
            <button className="btn btn-outline-primary">
              <Link to={"/createpost"}>Make a post</Link>
            </button>
          </div>
        </div>
        <div className="card col-4" data-testid="card">
          <img
            src={imgComments}
            alt="image about comments"
            className="card-img-top"
          ></img>
          <div className="card-body">
            <h5 className="card-title">React and Comment</h5>
            <p className="card-text">Show your intertest in Activities</p>
            <button className="btn btn-outline-primary">
              <Link to={"/posts"}>See the Posts</Link>
            </button>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

export default App;
