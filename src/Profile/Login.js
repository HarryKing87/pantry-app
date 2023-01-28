import React from "react";
import Navigation from "../Navigation";
import "../CSS/login.css";
import { useState } from "react";

const CSSStyling = {
  width: "100%",
  position: "relative",
};

function Login() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  const validateFields = () => {
    var check = document.getElementsByTagName("input");
    var len = check.length;
    for (var i = 0; i < len; i++) {
      if (check[i].value === "") {
        document.querySelector(".error-message").style.color = "red";
        document.querySelector(".error-message").innerHTML =
          "Please fill in all the required fields.";
        return false;
      }
    }
  };

  const handleSubmit = (event) => {
    var isValid;
    event.preventDefault();
    if (username && password) {
      if (username === "admin" && password === "administrator") {
        isValid = true;
        setMessage(`Hello ${username}!`);
        setUsername("");
        setPassword("");
        localStorage.setItem("username", username);
        setTimeout(() => {
          window.location.href = "http://localhost:3000/profile";
        }, 3000);
      } else {
        isValid = false;
        document.querySelector(".error-message").style.color = "red";
        document.querySelector(".error-message").innerHTML =
          "Wrong credentials.";
      }
    }
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
          style={CSSStyling}
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
          onSubmit={handleSubmit}
          id="loginForm"
          action="/profile"
          method="POST"
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <i class="error-message"></i>
          <button id="loginButton" type="submit" onClick={validateFields}>
            Submit
          </button>
          <h1>{message}</h1>
        </form>
      </div>
    </div>
  );
}

export default Login;
