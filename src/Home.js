import Navigation from "./Navigation";
import "./CSS/home.css";
import "./CSS/home-banner.css";
export default function Home() {
  return (
    <div className="home-component">
      <Navigation />
      <div class="container">
        <div class="neon">Pantry. </div>
      </div>
      <div className="home-content"></div>
    </div>
  );
}
