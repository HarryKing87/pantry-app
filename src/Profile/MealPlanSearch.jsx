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
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { auth } from "../Database/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const db = getFirestore();

export default function MealPlanSearch({ setMeal }) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodImage, setNewFoodImage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        try {
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            // New user, create a new document
            await setDoc(userRef, { meal: "" });
          } else {
            // Existing user, load foodName
            const data = querySnapshot.docs[0].data();
            setMeal(data.meal || "");
          }
        } catch (error) {
          console.error("Error getting user data:", error);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setMeal]);

  const handleMealPlanSave = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userRef, {
          meal: {
            foodName: newFoodName,
            foodImage: newFoodImage,
            selectedDay: selectedDay,
          },
        });
        console.log({
          meal: {
            foodName: newFoodName,
            foodImage: newFoodImage,
            selectedDay: selectedDay,
          },
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
          value={newFoodName} // Use local state for input
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
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.value)}
          options={days}
          optionLabel="name"
        />
        <small>Add a day.</small>
        <br />
        <br />
        <InputTextarea autoResize id="notes" rows={5} cols={71} />
        <br />
        <small htmlFor="notes">Add any related notes.</small>
        <button onClick={handleMealPlanSave}>Add</button>{" "}
        {/* Correct reference */}
      </Dialog>
    </div>
  );
}
