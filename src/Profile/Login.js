import React from "react";
import Navigation from "../Navigation";
import "../CSS/login.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Database/firebase";
import { useNavigate } from "react-router-dom";
/* React Toastify Notifications Imports */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const showToastMessageLogin = () => {
    toast.success("Welcome back, " + email + "!", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message-success-login",
    });
  };

  const showToastMessageFailedLogin = () => {
    toast.error("Wrong credentials", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message-failed-login",
    });
  };

  const loginCustomer = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // Setting the email address of the user to localStorage for profile usage.
        localStorage.setItem("email", email);
        showToastMessageLogin();
        setTimeout(function () {
          navigate("/profile");
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        showToastMessageFailedLogin();
      });
  };

  return (
    <div>
      <Navigation />
      <ToastContainer />
      <div className="container-login">
        <form
          id="loginForm"
          action="/profile"
          method="POST"
          onSubmit={loginCustomer}
        >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <i className="error-message"></i>
          <button id="loginButton" type="submit">
            Login
          </button>
          <h5>
            Don't have an account? <a href="/register">Register</a>
          </h5>
          <p className="imageBy">
            <i>Image by: Tania Melnyczuk</i>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
