import "./CSS/nav-mealplanner.css";
import { useState, useEffect } from "react";
/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faQuestion,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
// Icon set for profile pic
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { Dialog } from "primereact/dialog";
import { auth } from "./Database/firebase";

const db = getFirestore();

export default function NavigationMealPlan() {
  const [user, setUser] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
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
      },
      [user]
    );
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
            <FontAwesomeIcon
              icon={faQuestion}
              className="mealplanner-icon"
              onClick={() => setInfoVisible(true)}
            />
          </li>
          <li className="notification-container">
            <FontAwesomeIcon icon={faBell} className="mealplanner-icon" />
            {/* <span className="badge">5</span> */}
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
      <Dialog
        className="info-Dialog"
        header="Seeking Information?"
        visible={infoVisible}
        onHide={() => setInfoVisible(false)}
      >
        <div className="info-panel">
          <div className="info-cards">
            <Card
              title="🍎 Your Healthy Choice"
              subTitle="Fresh & Nutritious"
              style={{ width: "300px", marginBottom: "20px" }}
              className="info-individualCard"
            >
              <p>
                Enjoy a world of nutritious and delicious meal options right at
                your fingertips. Our meal planner helps you stay on track with
                fresh, healthy choices tailored to your needs.
              </p>
            </Card>

            <Card
              title="📅 Plan Your Week"
              subTitle="Organize Effortlessly"
              style={{ width: "300px", marginBottom: "20px" }}
              className="info-individualCard"
            >
              <p>
                Keep your week organized with our easy-to-use planner. Schedule
                your meals for each day and never worry about last-minute
                decisions.
              </p>
            </Card>

            <Card
              title="📋 Keep Track"
              subTitle="Notes & Tags"
              style={{ width: "300px", marginBottom: "20px" }}
              className="info-individualCard"
            >
              <p>
                Add notes and tags to each meal to track your preferences and
                make adjustments as needed. Our planner makes it easy to
                remember what works best for you.
              </p>
            </Card>

            <Card
              title="🍽️ Meal Prep Made Simple"
              subTitle="Efficient & Easy"
              style={{ width: "300px", marginBottom: "20px" }}
              className="info-individualCard"
            >
              <p>
                Streamline your meal prep with our intuitive interface. Quickly
                add, edit, and manage meals to ensure you’re always ready for a
                healthy, satisfying meal.
              </p>
            </Card>
          </div>
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <p>Would you like to communicate or have any ideas?</p>
            <a
              href="mailto:harrykinghsv@gmail.com"
              className="email-button"
              style={{ margin: "0 auto" }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ marginRight: "5px" }}
              />{" "}
              Send Us a Message
            </a>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
