import "./CSS/navigation.css";
import "./CSS/mobile-nav.css";
export default function Navigation() {
  return (
    <div className="nav-container">
      <div className="mobile-nav">
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
              <a href="/">
                <li>Home</li>
              </a>
              <a href="/about">
                <li>About</li>
              </a>
              <a href="/contact">
                <li>Contact</li>
              </a>
              <a href="/faq">
                <li>FAQ</li>
              </a>
              <a href="/dashboard">
                <li>Dashboard</li>
              </a>
            </ul>
          </div>
        </nav>
      </div>
      <div className="desktop-nav">
        <ul id="navigation-items-mobile">
          <li>
            <a
              href="/"
              style={{ "font-family": '"Avenir Next", "Avenir", sans-serif;' }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              style={{ "font-family": '"Avenir Next", "Avenir", sans-serif;' }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              style={{ "font-family": '"Avenir Next", "Avenir", sans-serif;' }}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="/faq"
              style={{ "font-family": '"Avenir Next", "Avenir", sans-serif;' }}
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="/dashboard"
              style={{ "font-family": '"Avenir Next", "Avenir", sans-serif;' }}
            >
              FAQ
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
