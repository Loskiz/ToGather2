import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink className="nav-link navbar-brand" to={"/"} data-testid="brand">
          ToGather
        </NavLink>
        <ul className="navbar-nav mr-auto mb-3 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to={"/posts"}>
              Posts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/createpost"}>
              Make a Post
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
