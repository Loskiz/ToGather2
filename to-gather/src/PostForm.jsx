import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function isValid(title, email, type, location, groupsize, description) {
  if (
    title.trim() &&
    email.trim() &&
    type.trim() &&
    location.trim() &&
    groupsize.trim() &&
    description.trim()
  ) {
    return true;
  } else {
    return false;
  }
}

export default function PostForm(props) {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [groupsize, setGroupsize] = useState("");
  const [description, setDescription] = useState("");
  let likes = 0;
  let comments = [];
  const [APIURL, setAPIURL] = useState("http://localhost:3001/posts");
  const [APIType, setAPIType] = useState("POST");
  const navigate = useNavigate();

  useEffect(() => {
    if (props.obj) {
      setTitle(props.obj.title);
      setEmail(props.obj.email);
      setType(props.obj.type);
      setLocation(props.obj.location);
      setGroupsize(props.obj.groupsize);
      setDescription(props.obj.description);
      likes = props.obj.likes;
      comments = props.obj.comments;
      setAPIType("PUT");
      setAPIURL(APIURL + `/${props.obj.id.toString()}`);
    }
  }, []);

  return (
    <div className="container justify-content-center align-items-center">
      <div className="row my-auto">
        <form
          className="col my-auto"
          onSubmit={(event) => {
            event.preventDefault();
            if (isValid(title, email, type, location, groupsize, description)) {
              const apiUrl = `${APIURL}`;
              fetch(apiUrl, {
                method: `${APIType}`,
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: title,
                  email: email,
                  type: type,
                  location: location,
                  groupsize: groupsize,
                  description: description,
                  likes: likes,
                  comments: comments,
                }),
              }).then((response) => {
                if (response.ok) {
                  toast.success("Form Submitted", {
                    onClose: () => {
                      navigate("/posts");
                    },
                  });
                } else {
                  toast.error("Error in form submission.");
                  console.log(APIURL);
                }
              });
            } else {
              toast.error("Please make sure all fields are filled out");
            }
          }}
        >
          <div className="row my-2">
            <div className="col">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                className="form-control"
                name="title"
                id="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="row my-2">
            <div className="col">
              <label className="form-label" htmlFor="email">
                <span>Email</span>
              </label>
              <input
                className="form-control"
                name="email"
                id="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </div>
            <div className="col">
              <label htmlFor="type" className="form-label">
                <span>Type</span>
              </label>
              <input
                className="form-control"
                name="type"
                id="type"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="row my-2">
            <div className="col">
              <label htmlFor="location" className="form-label">
                <span>Location</span>
              </label>
              <input
                className="form-control"
                name="location"
                id="location"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              ></input>
            </div>
            <div className="col">
              <label htmlFor="groupsize" className="form-label">
                <span>Group Size</span>
              </label>
              <select
                className="form-select"
                name="groupsize"
                id="groupsize"
                value={groupsize}
                onChange={(event) => {
                  setGroupsize(event.target.value);
                }}
              >
                <option value={""}>--- Select One ---</option>
                <option value={"Small (1-4)"}>Small (1-4)</option>
                <option value={"Medium (5-12)"}>Medium (5-12)</option>
                <option value={"Large (13+)"}>Large (13+)</option>
              </select>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-12">
              <label htmlFor="description" className="form-label">
                <span>Description</span>
              </label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="row my-2 justify-content-center">
            <button
              type="submit"
              className="btn btn-primary col-1"
              id="button-submit"
              data-testid="button-submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* <ToastContainer position="bottom-left" autoClose={1000}/> */}
    </div>
  );
}
