import React, { useState } from "react"; // Importing useState from React
import Navigation from "../Navigation";
import Login from "./Login"; // Importing the Login component
import "../CSS/login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Database/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [template, setTemplate] = useState("register");
  const [errorMessage, setErrorMessage] = useState("");

  const registerCustomer = async (e) => {
    e.preventDefault();

    const errorMap = {
      "auth/email-already-in-use": "Email is already in use.",
      "auth/weak-password": "Password must contain at least 6 characters.",
      "auth/invalid-email":
        "The email you've entered is either already in use or invalid.",
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      toast.success("Profile created successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        window.location.href = "/profile";
      }, 3000);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      const userFriendlyErrorMessage =
        errorMap[errorCode] || "An error occurred. Please try again.";

      setErrorMessage(userFriendlyErrorMessage);

      console.log(errorCode, errorMessage);
    }
  };

  const changeTemplate = () => {
    setTemplate(template === "login" ? "register" : "login");
  };

  return (
    <div>
      {template === "register" ? (
        <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
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
                Already have an account?{" "}
                <span onClick={changeTemplate} className="colored-auth">Login</span>
              </h5>
              <p className="imageBy">
                <i>Image by: Tania Melnyczuk</i>
              </p>
            </form>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Register;
