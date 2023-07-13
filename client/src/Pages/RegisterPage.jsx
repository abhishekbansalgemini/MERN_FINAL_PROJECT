import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../Components/ValidationsUtils/validationUtils";
import Header from "../Components/Header/Header";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function registerUser(event) {
    event.preventDefault();

    if (name.trim() === "") {
      toast("Name is required");
      return;
    } else if (!validateName(name)) {
      toast("Please enter a valid name with only alphabets.");
      return;
    }

    if (email.trim() === "") {
      toast("Please enter your email id");
      return;
    } else if (!validateEmail(email)) {
      toast("Please enter a valid email address.");
      return;
    }

    if (password.trim() === "") {
      toast("Please enter your password");
      return;
    } else if (!validatePassword(password)) {
      toast(
        "Please enter a valid password with at least 8 characters, including at least one uppercase letter, one numeric value, and one special character."
      );
      return;
    }

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      toast("Registration successful");
      setRedirect(true);
    } catch (err) {
      if (err.response.status === 409) {
        toast("User already exists");
      } else {
        toast("Registration failed");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
    <Header></Header>
    <div className="flex items-center justify-center h-[88vh]">
      <div className="w-full max-w-md p-4 bg-gray-100 shadow-lg rounded">
        <h1 className="mb-4 text-3xl font-bold text-center">Register</h1>
        <form className="space-y-4" onSubmit={registerUser}>
          <div>
            <label
              htmlFor="name"
              className="text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="w-full py-2 text-white bg-primary rounded focus:outline-none">
            Register
          </button>
          <div className="text-center">
            <span className="text-sm text-gray-500">
              Already a member?{" "}
              <Link to="/login" className="underline text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
    </>
  );
}
