// HomePage.js
import { useState, useEffect } from "react";
import "./CSS/home.css";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <nav>
        <div className="logo">
          <img
            src={
              process.env.PUBLIC_URL +
              "/Coding_Harry_an_iPhone_application_logo_for_an_app_that_control_a9246b4b-681d-44ae-aa52-acad015a10de.jpg"
            }
            alt="Logo"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <ul className={isOpen ? "menu open" : "menu"}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/faq">FAQ</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <div
        class="background-image"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/lily-banse--YHSwy6uqvk-unsplash.jpg)`,
          objectFit: "cover",
        }}
      >
        <div class="content">
          <h1>Organize Your Pantry Like a Pro</h1>
          <p>Why stay unorganized when you have Pantry?</p>
          <div className="home-buttons">
            <a href="/about">
              <button>About</button>
            </a>
            <div className="login-button">
              <a href="/login">
                <button className="login-button-home">Login</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
