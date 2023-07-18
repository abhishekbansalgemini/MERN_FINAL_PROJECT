import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header/Header";
import Modal from "react-modal";
import {
  validatePassword,
} from "../Components/ValidationsUtils/validationUtils";
import "./modal2.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    try {
      const userInfo = await axios.post("/login", {
        email,
        password,
      });
      setUser(userInfo.data);
      toast("Login Successful");
      setRedirect(true);
    } catch (err) {
      toast("Invalid login credentials");
    }
  };

  const updatePassword = async () => {
    if (newPassword.trim() === "") {
      toast("Please enter your new password");
      return;
    } else if (!validatePassword(newPassword)) {
      toast(
        "Please enter a valid password with at least 8 characters, including at least one uppercase letter, one numeric value, and one special character."
      );
      return;
    } 
    try {
      const userInfo = await axios.put("/login", {
        email,
        newPassword,
      });
      setUser(userInfo.data);
      toast("Login Successful");
      setRedirect(true);
    } catch (err) {
      toast("Not a valid user");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header></Header>
      <div className="flex items-center justify-center h-[88vh] bg-gradient-to-r">
        <div className="w-full max-w-sm p-8 bg-gray-100 rounded shadow-lg overflow-hidden">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h1>
          <form className="space-y-4" onSubmit={login}>
            <div>
              <label htmlFor="email" className="text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded focus:outline-none focus:ring focus:ring-purple-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded focus:outline-none focus:ring focus:ring-purple-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                  className="text-sm text-purple-400 hover:underline bg-transparent"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            <button className="w-full py-2 text-white bg-primary rounded focus:outline-none">
              Login
            </button>
            <div className="text-center">
              <span className="text-sm text-gray-400">
                Don't have an account yet?{" "}
                <Link to="/register" className="underline text-purple-400">
                  Register now
                </Link>
              </span>
            </div>
          </form>
        </div>
        <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="new password..."
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <button className="mr-2" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="text-red-500" onClick={updatePassword}>
            Confirm
          </button>
        </div>
      </Modal>
        <ToastContainer />
        
      </div>
    </>
  );
}
