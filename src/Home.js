import Navigation from "./Navigation";
import "./CSS/home.css";
import "./CSS/home-banner.css";
import "./CSS/home-button.css";
export default function Home() {
  return (
    <div className="home-component">
      <Navigation />
      <div class="container">
        <div class="neon">Pantry. </div>
      </div>
      <div className="home-content" style={{ margin: "15% 0 0 0" }}>
        <div className="home-hero">
          <h1 className="saveMore">Save more.</h1>
          <h1
            style={{
              "border-bottom": "2.5px solid white",
              display: "inline-block",
            }}
          >
            Do less.
          </h1>
        </div>
        <div className="buttonStart">
          <button class="fade">Start</button>
        </div>
      </div>
    </div>
  );
}
