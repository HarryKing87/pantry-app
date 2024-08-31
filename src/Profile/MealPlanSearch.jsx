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

import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { auth } from "../Database/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const db = getFirestore();

export default function MealPlanSearch({ setMeal, meal }) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodImage, setNewFoodImage] = useState("");
  const [newMealNotes, setNewMealNotes] = useState("");
  const [mealTag, setMealTag] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleMealPlanSave = async () => {
    if (user) {
      const newMeal = {
        foodName: newFoodName,
        foodImage: newFoodImage ? newFoodImage : "",
        selectedDay: selectedDay,
        notes: newMealNotes,
        tag: mealTag,
      };
      const userRef = doc(db, "users", user.uid);
      const updatedMeal = meal ? [...meal, newMeal] : [newMeal];
      try {
        await updateDoc(userRef, {
          meal: updatedMeal,
        });
        toast.success("Your food has been updated!", { life: 3000 });
        setVisible(false);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };

  // get user image from PC to show on Food section
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

  const [selectedDay, setSelectedDay] = useState(null);
  const days = [
    { name: "monday", code: "MON" },
    { name: "tuesday", code: "TUE" },
    { name: "wednesday", code: "WED" },
    { name: "thursday", code: "THU" },
    { name: "friday", code: "FRI" },
    { name: "saturday", code: "SAT" },
    { name: "sunday", code: "SUN" },
  ];

  document.querySelectorAll("#mealTags span").forEach((span) => {
    span.addEventListener("click", function () {
      // Remove the selected class from all spans
      document
        .querySelectorAll("#mealTags span")
        .forEach((el) => el.classList.remove("selected"));

      // Add the selected class to the clicked span
      this.classList.add("selected");
    });
  });

  const handleTagClick = (el) => {
    setMealTag(el);
    console.log(el);
  };

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
          <button id="labels">
            <FontAwesomeIcon icon={faBolt} id="util-icon" />
            Labels
          </button>
          <button id="addMeal" onClick={() => setVisible(true)}>
            <FontAwesomeIcon icon={faNoteSticky} id="util-icon" />
            Add Meal
          </button>
          <button id="share">
            <FontAwesomeIcon icon={faShareNodes} id="util-icon" />
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
          onChange={(e) => setNewFoodName(e.target.value)}
        />
        <small htmlFor="foodName">Add a name of the food.</small>
        <br />
        <br />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <small>Add an image.</small>
        <br />
        <br />
        <ListBox
          onChange={(e) => setSelectedDay(e.value)}
          options={days}
          optionLabel="name"
        />
        <small>Add a day.</small>
        <br />
        <br />
        <InputTextarea
          autoResize
          id="notes"
          rows={5}
          cols={71}
          onChange={(e) => setNewMealNotes(e.target.value)}
        />
        <br />
        <small htmlFor="notes">Add any related notes.</small>
        <br />
        <br />
        <div id="mealTags">
          <span
            id="mealplan-tag"
            className="breakfast"
            onClick={() => handleTagClick("breakfast")}
          >
            Breakfast
          </span>
          <span
            id="mealplan-tag"
            className="lunch"
            onClick={() => handleTagClick("lunch")}
          >
            Lunch
          </span>
          <span
            id="mealplan-tag"
            className="dinner"
            onClick={() => handleTagClick("dinner")}
          >
            Dinner
          </span>
          <span
            id="mealplan-tag"
            className="snack"
            onClick={() => handleTagClick("snack")}
          >
            Snack
          </span>
        </div>
        <br />
        <button onClick={handleMealPlanSave}>Add</button>{" "}
      </Dialog>
    </div>
  );
}
