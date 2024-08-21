/* Font Awesome icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState } from "react";
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

export default function MealPlanSearch() {
  const [visible, setVisible] = useState(false);
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
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        {/* Typing the food here, should trigger the Food API */}
        <InputText id="foodName" />
        <small htmlFor="foodName">Add a name of the food.</small>
        <br />
        <br />
        <input type="file" accept="image/*" />
        <small>Add an image.</small>
        <br />
        <br />
        <InputTextarea autoResize id="notes" rows={5} cols={71} />
        <small htmlFor="notes">Add any related notes.</small>
        <button>Add</button>
      </Dialog>
    </div>
  );
}
