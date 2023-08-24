import React from "react";
import Navigation from "../Navigation";
import "../CSS/login.css";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Database/firebase";

function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerCustomer = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("already")) {
          setErrorMessage("Email is already in-use.");
        } else if (errorMessage.includes("characters")) {
          setErrorMessage("Password must contain at least 6 characters.");
        }
        if (errorMessage.includes("email")) {
          setErrorMessage(
            "The email you've entered is either already in-use or invalid."
          );
        }
        console.log(errorCode, errorMessage);
        // ..
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
          onSubmit={registerCustomer}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <i className="passwordFeedback" style={{ color: "red" }}>
            {errorMessage}
          </i>
          <button id="loginButton" type="submit">
            Register
          </button>
          <h5>
            Already have an account? <a href="/login">Login</a>
          </h5>
          <p className="imageBy">
            <i>Image by: Tania Melnyczuk</i>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
