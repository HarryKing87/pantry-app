import "./CSS/navigation.css";
import "./CSS/mobile-nav.css";
import { useState } from "react";
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
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
  );
}
