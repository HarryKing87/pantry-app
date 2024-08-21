/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState, useEffect } from "react";
import {
  faEllipsis,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
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
import { auth } from "../Database/firebase";

const db = getFirestore();

export default function MealPlanDays() {
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
      <div className="weekly-plan">
        <div id="monday">
          <div className="day-of-week">
            <p>Monday</p>
          </div>
          <div id="mealplan-task">
            <div className="mealplan-title">
              <h3>Avocado & Eggs</h3>
              <span>
                <FontAwesomeIcon icon={faEllipsis} />
              </span>
            </div>
            <span id="mealplan-tag">Breakfast</span>
            <img
              src={process.env.PUBLIC_URL + "/Images/testphoto.png"}
              alt="Logo"
              style={{ width: "100%", marginTop: "0.5rem" }}
            />
            <div className="mealplan-nutriscore-img">
              <div id="mealplan-nutriinfo">
                <span id="nutriscore">
                  <FontAwesomeIcon icon={faFireFlameCurved} id="caloriesIcon" />
                </span>
                <a href="/Profile">
                  <Avatar
                    image={selectedImage}
                    size="large"
                    shape="circle"
                    style={{ width: "35px", height: "35px" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="tuesday">
          <div className="day-of-week">
            <p>Tuesday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
        <div id="wednesday">
          <div className="day-of-week">
            <p>Wednesday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
        <div id="thursday">
          <div className="day-of-week">
            <p>Thursday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
        <div id="friday">
          <div className="day-of-week">
            <p>Friday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
        <div id="saturday">
          <div className="day-of-week">
            <p>Saturday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
        <div id="sunday">
          <div className="day-of-week">
            <p>Sunday</p>
          </div>
          <div id="mealplan-task"></div>
        </div>
      </div>
    </div>
  );
}
