import React from "react";
import Navigation from "../Navigation";
import "../CSS/login.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Database/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function showNotification() {
    if (Notification.permission === "granted") {
      // Display the notification
      new Notification("Pantry.", {
        body: `Welcome back, ${email}!`,
      });
    } else if (Notification.permission !== "denied") {
      // Request permission from the user
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Display the notification
          new Notification("Pantry.", {
            body: `Welcome back, ${email}!`,
          });
        }
      });
    }
  }

  const loginCustomer = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // Setting the email address of the user to localStorage for profile usage.
        localStorage.setItem("email", email);
        navigate("/profile");
        showNotification();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorCode);
      });
  };

  return (
    <div>
      <Navigation />
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
