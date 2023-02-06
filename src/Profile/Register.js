import React from "react";
import Navigation from "../Navigation";
import "../CSS/login.css";
import { useState } from "react";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../Database/firebase';

function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registerCustomer = async (e) => {
    e.preventDefault()
   
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
          console.log(errorCode, errorMessage);
          // ..
      });
    }

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
        <form id="loginForm" action="/profile" method="POST" onSubmit={registerCustomer}>
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
          <i className="passwordFeedback"></i>
          <button id="loginButton" type="submit">
            Register
          </button>
          <h5>
            Already have an account? <a href="/login">Login</a>
          </h5>
        </form>
      </div>
    </div>
  );
}

export default Register;
