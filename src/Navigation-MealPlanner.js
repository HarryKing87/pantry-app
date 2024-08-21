import "./CSS/nav-mealplanner.css";
import { useState, useEffect } from "react";
/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faQuestion, faBell } from "@fortawesome/free-solid-svg-icons";
// Icon set for profile pic
import { Avatar } from "primereact/avatar";
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
import { signOut } from "firebase/auth";
import { auth } from "./Database/firebase";

const db = getFirestore();

export default function NavigationMealPlan() {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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
                selectedImage,
              });
            } else {
              const data = querySnapshot.docs[0].data();
              setSelectedImage(data.userImage);
            }
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
          });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <nav className="nav-mealplanner">
        <div className="meal-planner-logo">
          <div>
            <a href="/">
              <img
                src={process.env.PUBLIC_URL + "/Images/logo.jpg"}
                alt="Logo"
                style={{ borderRadius: "10px" }}
              />
            </a>
          </div>
          <div>
            <p>Pantry.</p>
          </div>
        </div>
        <ul className="mealplanner-ul">
          <li>
            <FontAwesomeIcon icon={faQuestion} className="mealplanner-icon" />
          </li>
          <li>
            <FontAwesomeIcon icon={faBell} className="mealplanner-icon" />
          </li>
          <li>
            <a href="/Profile">
              <Avatar
                image={selectedImage}
                size="xlarge"
                shape="circle"
                style={{ width: "35px", height: "35px" }}
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
