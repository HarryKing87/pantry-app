// HomePage.js
import "./CSS/home.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import FAQ from "./FAQ";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth } from "./Database/firebase";
import Navigation from "./Navigation-Home";

const db = getFirestore();


const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [darkModeChecked, setdarkModeChecked] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        getDocs(q)
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              setDoc(userRef, {
                id: user.uid,
                darkModeChecked,
              });
            } else {
              const data = querySnapshot.docs[0].data();
              setdarkModeChecked(data.isDarkModeEnabled);
            }
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
          });
      } else {
        setUser(null);
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    if (darkModeChecked && darkModeChecked !== null) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkModeChecked]);
  return (
    <div className="App">
      <Navigation />
      <div
        class="background-image"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/Images/lily-banse-YHSwy6uqvk-unsplash.avif)`,
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
            src={process.env.PUBLIC_URL + "/Images/My project-1-4-min.png"}
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
            src={process.env.PUBLIC_URL + "/Images/My project-1-7-min.png"}
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
            src={process.env.PUBLIC_URL + "/Images/My project-1-6-min.png"}
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
      <FAQ />
    </div>
  );
};

export default HomePage;
