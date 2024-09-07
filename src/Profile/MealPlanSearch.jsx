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
  const [isFormValid, setIsFormValid] = useState(false);

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

  useEffect(() => {
    validateForm(); // Check form validity whenever input values change
  });

  const validateForm = () => {
    const isValid =
      newFoodName !== "" &&
      selectedDay !== null &&
      newMealNotes !== "" &&
      mealTag !== "";

    setIsFormValid(isValid);
  };

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
