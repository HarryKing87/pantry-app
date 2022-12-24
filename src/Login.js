import React from "react";
import Navigation from "./Navigation";
import "./CSS/login.css";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
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
            required
            onChange={(event) => setUsername(event.target.value)}
          />
          <i class="error-message"></i>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" required />
          <i class="error-message"></i>
          <button id="loginButton" type="submit">
            Submit
          </button>
          <h1>{message}</h1>
        </form>
      </div>
    </div>
  );
}
