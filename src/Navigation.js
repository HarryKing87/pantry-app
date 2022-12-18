import "./CSS/navigation.css";
export default function Navigation() {
  return (
    <div className="mobile-nav">
      <ul id="navigation-items-mobile">
        <li>
          <a href="/" style={{ fontWeight: "700" }}>
            Home
          </a>
        </li>
        <li>
          <a href="/about" style={{ fontWeight: "700" }}>
            About
          </a>
        </li>
        <li>
          <a href="/projects" style={{ fontWeight: "700" }}>
            Projects
          </a>
        </li>
        <li>
          <a href="/contact" style={{ fontWeight: "700" }}>
            Contact Me
          </a>
        </li>
      </ul>
    </div>
  );
}
