// HomePage.js
import { useState } from "react";
import APIComponent from "./APIComponent";
import "./CSS/home.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <nav>
        <div className="logo">
          <LazyLoadImage
            src={
              process.env.PUBLIC_URL +
              "/Images/Coding_Harry_an_iPhone_application_logo_for_an_app_that_control_a9246b4b-681d-44ae-aa52-acad015a10de.webp"
            }
            alt="Logo"
            style={{ borderRadius: "10px" }}
            effect="blur"
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
          backgroundImage: `url(${process.env.PUBLIC_URL}/Images/lily-banse-YHSwy6uqvk-unsplash.webp)`,
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
      <div className="home-banners">
        <div className="container-image">
          <h1>Pantry.</h1>
          <LazyLoadImage
            src={
              process.env.PUBLIC_URL +
              "/Illustrations/Transparent/My project-1-4.png"
            }
            alt=""
            effect="blur"
          />

          <h2>Fresh Ingedients</h2>
          <p>
            Fresh ingredients are the foundation of great cooking. Whether
            you're an experienced chef or a beginner in the kitchen, using fresh
            ingredients can take your dishes to the next level. Not only do they
            enhance the flavor and texture of your food, but they also provide
            vital nutrients that are essential for maintaining good health.
          </p>
        </div>
        <div className="container-image2">
          <h1>Pantry.</h1>
          <LazyLoadImage
            src={
              process.env.PUBLIC_URL +
              "/Illustrations/Transparent/My project-1-7.png"
            }
            alt=""
            effect="blur"
          />
          <h2>Delicious Recipes</h2>
          <p>
            Indulge your taste buds with our collection of delicious recipes,
            perfect for any occasion. From savory mains to sweet treats, our
            recipes are easy to follow and sure to impress. Whether you're
            cooking for a special event or simply trying to spice up your weekly
            meal routine, we've got you covered.
          </p>
        </div>
        <div className="container-image3">
          <h1>Pantry.</h1>
          <LazyLoadImage
            src={
              process.env.PUBLIC_URL +
              "/Illustrations/Transparent/My project-1-6.png"
            }
            alt=""
            effect="blur"
          />
          <h2>Organization Tips</h2>
          <p>
            A well-organized pantry can make meal prep and cooking a breeze.
            With our simple tips and tricks, you can transform your cluttered
            pantry into a tidy and functional space. We'll show you how to
            maximize storage, reduce waste, and make the most of your pantry's
            space.
          </p>
        </div>
      </div>
      <div>
        <APIComponent />
      </div>
    </div>
  );
};

export default HomePage;
