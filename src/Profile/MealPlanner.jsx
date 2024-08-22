import { useState, useEffect } from "react";
import NavigationMealPlan from "../Navigation-MealPlanner";
import MealPlanDays from "./MealPlanDays";
import MealPlanSearch from "./MealPlanSearch";
import "../CSS/mealplanner.css";
/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faNotesMedical,
  faEnvelopeOpenText,
  faCompass,
  faChartSimple,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

//Firestore
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../Database/firebase";

const db = getFirestore();

export default function MealPlanner() {
  const [user, setUser] = useState(null);
  const [meal, setMeal] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setMeal(data.meal || "");
          setSelectedImage(data.selectedImage || "");
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSetMeal = (meal) => {
    setMeal(meal);
  };

  return (
    <div>
      <NavigationMealPlan />

      {/* Main Meal Planner section*/}
      <div className="mealplan-dashboard">
        <div className="mealplan-left">
          <br />
          <div className="mealplan-prefs">
            <div className="mealplan-image">
              <img
                src={process.env.PUBLIC_URL + "/Images/logo.jpg"}
                alt="Logo"
                style={{ width: "45%" }}
              />
            </div>
            <div className="mealplan-desc">
              <p>Summer Diet</p>
            </div>
          </div>
          <div className="mealplan-options">
            <div className="planner-icons">
              <FontAwesomeIcon icon={faNotesMedical} id="meal-icon" />
              <p>Meal Planner</p>
            </div>
            <div className="planner-icons">
              <FontAwesomeIcon icon={faEnvelopeOpenText} id="meal-icon" />
              <p>Completed</p>
            </div>
            <div className="planner-icons">
              <FontAwesomeIcon icon={faCompass} id="meal-icon" />
              <p>Pending</p>
            </div>
            <div className="planner-icons">
              <FontAwesomeIcon icon={faChartSimple} id="meal-icon" />
              <p>Not Started</p>
            </div>
            <div className="planner-icons">
              <FontAwesomeIcon icon={faBolt} id="meal-icon" />
              <p>Notes</p>
            </div>
          </div>
          <hr />
        </div>

        <div className="mealplan-right">
          <br />
          <div id="container">
            <h1>Meal Planner</h1>
            <MealPlanSearch setMeal={handleSetMeal} />
          </div>
          <MealPlanDays meal={meal} selectedImage={selectedImage} />
        </div>
      </div>
    </div>
  );
}
