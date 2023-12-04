import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Root() {
  return (
    <>
      <Navbar />
      <ToastContainer autoClose={1000} />
      <Outlet />
    </>
  );
}
