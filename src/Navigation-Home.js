import "./CSS/navigation.css";
import "./CSS/mobile-nav.css";
import { useState } from "react";
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="nav-home">
      <div className="logo">
        <a href="/">
        <img
          src={
            process.env.PUBLIC_URL +
            "/Images/logo.jpg"
          }
          alt="Logo"
          style={{ borderRadius: "10px" }}
        />
</a>
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
