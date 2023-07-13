import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header/Header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

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
          </div>
          <button className="w-full py-2 text-white bg-primary rounded  focus:outline-none">
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
      <ToastContainer />
    </div>
    </>
  );
}

