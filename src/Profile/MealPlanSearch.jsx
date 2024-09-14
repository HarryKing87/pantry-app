import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState, useEffect } from "react";
import {
  faShareNodes,
  faNoteSticky,
  faBolt,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { AutoComplete } from "primereact/autocomplete";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ListBox } from "primereact/listbox";
import { OverlayPanel } from "primereact/overlaypanel";

import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth } from "../Database/firebase";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const db = getFirestore();

export default function MealPlanSearch({ setMeal, meal }) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodImage, setNewFoodImage] = useState("");
  const [newMealNotes, setNewMealNotes] = useState("");
  const [mealTag, setMealTag] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("Get user on MealPlanSearch");
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only on component mount

  const handleMealPlanSave = async () => {
    if (user) {
      const newMeal = {
        foodName: newFoodName,
        foodImage: newFoodImage || "",
        selectedDay,
        notes: newMealNotes,
        tag: mealTag,
      };

      const userRef = doc(db, "users", user.uid);

      try {
        // Fetch the latest user data before updating
        const userDoc = await getDoc(userRef);
        const updatedMeal = userDoc.exists()
          ? [...userDoc.data().meal, newMeal]
          : [newMeal];

        await updateDoc(userRef, { meal: updatedMeal });
        toast.success("Your food has been updated!", { life: 3000 });
        setVisible(false);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    } else {
      toast.error("Please fill out all required fields.", { life: 3000 });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewFoodImage(reader.result); // Store the data URL in the state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    const shareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    window.open(shareURL, "_blank", "width=1000,height=600");
  };

  const days = [
    { name: "monday", code: "MON" },
    { name: "tuesday", code: "TUE" },
    { name: "wednesday", code: "WED" },
    { name: "thursday", code: "THU" },
    { name: "friday", code: "FRI" },
    { name: "saturday", code: "SAT" },
    { name: "sunday", code: "SUN" },
  ];

  const handleTagClick = (el) => {
    setMealTag(el);
  };

  const labels = useRef(null);
  const social = useRef(null);
  return (
    <div>
      <div className="mealplan-search">
        <div className="mealplan-search-input">
          <span className="p-float-label">
            <AutoComplete inputId="ac" id="search" />
            <label htmlFor="ac">
              <FontAwesomeIcon icon={faMagnifyingGlass} /> Search Meals
            </label>
          </span>
        </div>
        <div className="mealplan-utilities">
          <button id="labels" onClick={(e) => labels.current.toggle(e)}>
            <FontAwesomeIcon icon={faBolt} id="util-icon" />
            <OverlayPanel ref={labels}>
              <p>
                Customize your meals effortlessly with labels for breakfast,
                lunch, dinner, and snacks.
              </p>
              <span
                id="mealplan-tag"
                className="breakfast"
                style={{ margin: "10px" }}
              >
                Breakfast
              </span>
              <span
                id="mealplan-tag"
                className="lunch"
                style={{ margin: "10px" }}
              >
                Lunch
              </span>
              <span
                id="mealplan-tag"
                className="dinner"
                style={{ margin: "10px" }}
              >
                Dinner
              </span>
              <span
                id="mealplan-tag"
                className="snack"
                style={{ margin: "10px" }}
              >
                Snack
              </span>
            </OverlayPanel>
            Labels
          </button>
          <button id="addMeal" onClick={() => setVisible(true)}>
            <FontAwesomeIcon icon={faNoteSticky} id="util-icon" />
            Add Meal
          </button>
          <button id="share" onClick={(e) => social.current.toggle(e)}>
            <FontAwesomeIcon icon={faShareNodes} id="util-icon" />
            <script
              async
              defer
              src="https://assets.pinterest.com/js/pinit.js"
            ></script>
            <OverlayPanel ref={social}>
              <img
                src="https://img.icons8.com/?size=100&id=118466&format=png&color=000000"
                alt="facebook logo"
                width={"30px"}
                style={{ cursor: "pointer", margin: "10px" }}
                onClick={handleFacebookShare}
              />
              <a
                class="share-btn twitter"
                href="https://twitter.com/share?url=https://www.itspantry.netlify.app"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=000000"
                  width={"30px"}
                  style={{ cursor: "pointer", margin: "10px" }}
                  alt="twitter logo"
                />
              </a>
              <a
                class="share-btn reddit"
                href="https://reddit.com/submit?url=https://www.itspantry.netlify.app"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=12463&format=png&color=000000"
                  width={"30px"}
                  style={{ cursor: "pointer", margin: "10px" }}
                  alt="reddit logo"
                />
              </a>
              <a
                class="share-btn email"
                href="mailto:?subject=Pantry&body=https://www.itspantry.netlify.app"
                rel="noreferrer"
                target="_blank"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=i3XElI5CmcBP&format=png&color=000000"
                  width={"30px"}
                  style={{ cursor: "pointer", margin: "10px" }}
                  alt="email logo"
                />
              </a>
            </OverlayPanel>
            Share
          </button>
        </div>
      </div>
      <Dialog
        header="Add new meal"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <InputText
          id="foodName"
          value={newFoodName}
          onChange={(e) => setNewFoodName(e.target.value)}
          required
        />
        <small htmlFor="foodName">Add a name of the food.</small>
        <br />
        <br />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <small>Add an image (optional).</small>
        <br />
        <br />
        <ListBox
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.value)}
          options={days}
          optionLabel="name"
          required
        />
        <small>Add a day.</small>
        <br />
        <br />
        <InputTextarea
          autoResize
          id="notes"
          rows={5}
          cols={71}
          value={newMealNotes}
          onChange={(e) => setNewMealNotes(e.target.value)}
          required
        />
        <small htmlFor="notes">Add any related notes.</small>
        <br />
        <br />
        <div id="mealTags">
          <span
            id="mealplan-tag"
            className={`breakfast ${mealTag === "breakfast" ? "selected" : ""}`}
            onClick={() => handleTagClick("breakfast")}
          >
            Breakfast
          </span>
          <span
            id="mealplan-tag"
            className={`lunch ${mealTag === "lunch" ? "selected" : ""}`}
            onClick={() => handleTagClick("lunch")}
          >
            Lunch
          </span>
          <span
            id="mealplan-tag"
            className={`dinner ${mealTag === "dinner" ? "selected" : ""}`}
            onClick={() => handleTagClick("dinner")}
          >
            Dinner
          </span>
          <span
            id="mealplan-tag"
            className={`snack ${mealTag === "snack" ? "selected" : ""}`}
            onClick={() => handleTagClick("snack")}
          >
            Snack
          </span>
        </div>
        <br />
        <button onClick={handleMealPlanSave}>Add</button>
      </Dialog>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}
