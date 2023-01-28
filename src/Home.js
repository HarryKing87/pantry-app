import React from "react";
import "./CSS/home.css";
import "./CSS/home-banner.css";
import "./CSS/home-button.css";
import "./CSS/loader.css";

class Home extends React.Component {
  render() {
    return (
      <div className="home-component">
        <div class="container">
          <div class="neon">Pantry. </div>
        </div>
        <div className="home-content" style={{ margin: "15% 0 0 0" }}>
          <div className="home-hero">
            <h1 className="saveMore">Save more.</h1>
            <h1
              style={{
                "border-bottom": "2.5px solid black",
                display: "inline-block",
                color: "black",
              }}
            >
              Do less.
            </h1>
          </div>
          <div className="buttonStart">
            <a href="/login">
              <button class="fade js-buttonStart">Start</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
