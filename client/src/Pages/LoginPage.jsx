// import axios from "axios";
// import { useContext, useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import { UserContext } from "../Context/UserContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Header from "../Components/Header/Header";
// import Modal from "react-modal";
// import {
//   validatePassword,
// } from "../Components/ValidationsUtils/validationUtils";
// import "./modal2.css";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [redirect, setRedirect] = useState(false);
//   const { setUser } = useContext(UserContext);
//   const [newPassword, setNewPassword] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const login = async (event) => {
//     event.preventDefault();

//     try {
//       const userInfo = await axios.post("/login", {
//         email,
//         password,
//       });
//       setUser(userInfo.data);
//       toast("Login Successful");
//       setRedirect(true);
//     } catch (err) {
//       toast("Invalid login credentials");
//     }
//   };

//   const updatePassword = async () => {
//     if (newPassword.trim() === "") {
//       toast("Please enter your new password");
//       return;
//     } else if (!validatePassword(newPassword)) {
//       toast(
//         "Please enter a valid password with at least 8 characters, including at least one uppercase letter, one numeric value, and one special character."
//       );
//       return;
//     }
//     try {
//       const userInfo = await axios.put("/login", {
//         email,
//         newPassword,
//       });
//       setUser(userInfo.data);
//       toast("Login Successful");
//       setRedirect(true);
//     } catch (err) {
//       toast("Not a valid user");
//     }
//   }

//   if (redirect) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <>
//       <Header></Header>
//       <div className="flex items-center justify-center h-[88vh] bg-gradient-to-r">
//         <div className="w-full max-w-sm p-8 bg-gray-100 rounded shadow-lg overflow-hidden">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//             Login
//           </h1>
//           <form className="space-y-4" onSubmit={login}>
//             <div>
//               <label htmlFor="email" className="text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-4 py-2 rounded focus:outline-none focus:ring focus:ring-purple-500"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-4 py-2 rounded focus:outline-none focus:ring focus:ring-purple-500"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div className="text-right">
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowModal(true);
//                   }}
//                   className="text-sm text-purple-400 hover:underline bg-transparent"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//             </div>
//             <button className="w-full py-2 text-white bg-primary rounded focus:outline-none">
//               Login
//             </button>
//             <div className="text-center">
//               <span className="text-sm text-gray-400">
//                 Don't have an account yet?{" "}
//                 <Link to="/register" className="underline text-purple-400">
//                   Register now
//                 </Link>
//               </span>
//             </div>
//           </form>
//         </div>
//         <Modal
//         isOpen={showModal}
//         onRequestClose={() => setShowModal(false)}
//         className="modal-content"
//         overlayClassName="modal-overlay"
//       >
//         <h2>Forgot Password</h2>
//         <input
//           type="email"
//           placeholder="email..."
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="new password..."
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <div className="flex justify-end">
//           <button className="mr-2" onClick={() => setShowModal(false)}>
//             Cancel
//           </button>
//           <button className="text-red-500" onClick={updatePassword}>
//             Confirm
//           </button>
//         </div>
//       </Modal>
//         <ToastContainer />

//       </div>
//     </>
//   );
// }

import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header/Header";
import Modal from "react-modal";
import { validatePassword } from "../Components/ValidationsUtils/validationUtils";
import "./modal2.css";
import axios from "axios";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2 rounded focus:outline-none focus:ring focus:ring-purple-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-4 right-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
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
