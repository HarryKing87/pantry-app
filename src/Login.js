import React from "react";
import Navigation from "./Navigation";
import "./CSS/login.css";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
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
    event.preventDefault();
    console.log(username);
    if (username) {
      setMessage(`Hello ${username}!`);
      setUsername("");
    }
  };
  return (
    <div>
      <Navigation />
      <div className="container-login">
        <form onSubmit={handleSubmit} id="loginForm">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" />
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
