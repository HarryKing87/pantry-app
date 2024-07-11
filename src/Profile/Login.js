import React, { useState } from "react";
import Navigation from "../Navigation";
import Register from "./Register";
import "../CSS/login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Database/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [template, setTemplate] = useState("login");

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
        showToastMessageLogin();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        showToastMessageFailedLogin();
      });
  };

  const changeTemplate = () => {
    setTemplate(template === 'login' ? 'register' : 'login');
  }

  return (
    <div>
      {template === "login" ? (
        <>
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
              <button id="loginButton" type="submit">
                Login
              </button>
              
              <h5>
            Don't have an account? <span onClick={changeTemplate} className="colored-auth">Register</span>
          </h5>
          <p className="imageBy">
            <i>Image by: Tania Melnyczuk</i>
          </p>
            </form>
          </div>
        </>
      ) : (
        <Register />
      )}
    </div>
  );
}

export default Login;
