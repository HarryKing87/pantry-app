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
        body: "This is a notification shown by Pantry!",
      });
    } else if (Notification.permission !== "denied") {
      // Request permission from the user
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Display the notification
          new Notification("My Notification", {
            body: "This is a notification shown by Pantry!",
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
        const user = userCredential.user;
        console.log(user);
        // Setting the email address of the user to localStorage for profile usage.
        localStorage.setItem("email", email);
        navigate("/profile");
        showNotification();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <div style={{ position: "absolute" }}>
        <Navigation />
      </div>
      <div className="container-login-image">
        <img
          src="https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1678&q=80"
          alt=""
        />
      </div>
      <div className="container-login">
        <div className="login-greeting">
          <div className="artist-name">Image by: Tania Melnyczuk</div>
          <h3>Your personal food tracking is ready</h3>
          <p>
            Upgrade your account and get full access to jumpstart your practice.
          </p>
        </div>
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
        </form>
      </div>
    </div>
  );
}

export default Login;
