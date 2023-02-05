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
              <a href="/feed">
                <li>Feed</li>
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
              style={{ "fontFamily": '"Avenir Next", "Avenir", sans-serif' }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              style={{ "fontFamily": '"Avenir Next", "Avenir", sans-serif' }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              style={{ "fontFamily": '"Avenir Next", "Avenir", sans-serif' }}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="/faq"
              style={{ "fontFamily": '"Avenir Next", "Avenir", sans-serif' }}
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="/dashboard"
              style={{ "fontFamily": '"Avenir Next", "Avenir", sans-serif' }}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/feed"
              style={{ "fontFamily": '"Avenir Next", "Avenir", sans-serif' }}
            >
              Feed
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
