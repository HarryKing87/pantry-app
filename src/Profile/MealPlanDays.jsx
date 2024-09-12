import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faEllipsis,
  faFireFlameCurved,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "primereact/avatar";
import { useState, useEffect } from "react";
/* React Toastify Notifications Imports */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { Toast } from "primereact/toast";
import MealPlanFoodInfo from "./MealPlanFoodInfo";

export default function MealPlanDays({ meal, setMeal, userImage }) {
  // State to store the fetched data
  const [nutritionalData, setNutritionalData] = useState({});
  const [mealLoading, setMealLoading] = useState(true);
  const [mealError, setMealError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [foodDialogVisible, setFoodDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  // State to track the item selected for deletion
  const [selectedItem, setSelectedItem] = useState(null);
  const [apiCallCounter, setApiCallCounter] = useState(0);
  useEffect(() => {
    const fetchNutritionalData = async () => {
      if (!meal || meal.length === 0 || hasFetched || apiCallCounter >= 5) {
        return; // Exit if conditions are met
      }
      setMealLoading(true);
      try {
        const fetchPromises = meal.map(async (item) => {
          const foodName = encodeURIComponent(item.foodName);
          setApiCallCounter((prevCounter) => prevCounter + 1); // Increment counter after each call
          const response = await fetch(
            `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=6jaxoYBjQGg51OL2IvFCk8nqzx6o0MbwV4sqt5eW&query=${foodName}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();

          if (
            result.foods &&
            result.foods[0] &&
            result.foods[0].foodNutrients
          ) {
            const kcalNutrient = result.foods[0].foodNutrients.find(
              (nutrient) => nutrient.nutrientName === "Energy"
            );
            const proteinNutrient = result.foods[0].foodNutrients.find(
              (nutrient) => nutrient.nutrientName === "Protein"
            );
            return {
              foodName: item.foodName,
              kcalValue: kcalNutrient ? kcalNutrient.value : "-",
              proteinValue: proteinNutrient ? proteinNutrient.value : "-",
            };
          }
          return {
            foodName: item.foodName,
            kcalValue: "-",
            proteinValue: "-",
          };
        });

        const results = await Promise.all(fetchPromises);

        const nutritionalMap = results.reduce(
          (acc, { foodName, kcalValue, proteinValue }) => {
            acc[foodName] = {
              kcalValue: kcalValue,
              proteinValue: proteinValue,
            };
            return acc;
          },
          {}
        );

        setNutritionalData(nutritionalMap);
        setHasFetched(true); // Data fetched
      } catch (error) {
        setMealError(error.message);
      } finally {
        setMealLoading(false);
      }
    };

    if (meal && meal.length > 0) {
      fetchNutritionalData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meal, hasFetched]); // Add apiCallCounter to the dependencies

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const handleDeleteMeal = () => {
    if (selectedItem) {
      const updatedMeal = meal.filter(
        (product) => product.foodName !== selectedItem.foodName
      );
      setMeal(updatedMeal);
      setHasFetched(false); // Recalling the hasFetched to update any properties that may have never updated
      setSelectedItem(null); // Clear the selected item after deletion
    }
  };

  const renderMealsForDay = (day) => {
    const headerElement = (
      <div
        style={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <Avatar image={userImage} shape="circle" />
        <span style={{ marginLeft: "10px" }}>Food Information</span>
        {/* faTrashCan icon to show ConfirmDialog */}
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={() => setConfirmDialogVisible(true)} // Show confirm dialog on click
          style={{
            marginLeft: "10px",
            fontSize: "12px",
            color: "red",
            cursor: "pointer",
          }}
        />
      </div>
    );
    return meal
      .filter((item) => item.selectedDay.name.toLowerCase() === day)
      .map((item, index) => (
        <div key={index} id="mealplan-task">
          <div className="mealplan-title">
            <h3>{item.foodName}</h3>
            <span>
              <Toast ref={toast} />

              {/* Only show Dialog for the selected item */}
              {selectedItem && selectedItem.foodName === item.foodName && (
                <Dialog
                  className="credentialsChange-dialog"
                  visible={foodDialogVisible} // Control visibility with foodDialogVisible state
                  header={headerElement}
                  style={{ width: "50%", margin: "0 auto" }}
                  onHide={() => setFoodDialogVisible(false)} // Close the dialog
                >
                  <div>
                    {/* ConfirmDialog to handle item deletion */}
                    <ConfirmDialog
                      className="credentialsChange-dialog"
                      group="declarative"
                      visible={confirmDialogVisible} // Control visibility with confirmDialogVisible state
                      onHide={() => setConfirmDialogVisible(false)} // Hide on rejection or cancel
                      message={`Are you sure you would like to remove ${selectedItem.foodName}?`}
                      header="Confirmation"
                      icon="pi pi-exclamation-triangle"
                      accept={handleDeleteMeal} // Function to handle deletion
                      reject={() => setConfirmDialogVisible(false)} // Close confirm dialog on rejection
                    />
                  </div>
                  <MealPlanFoodInfo
                    item={selectedItem}
                    nutriData={nutritionalData}
                  />
                </Dialog>
              )}

              {/* faEllipsis icon to open the main dialog */}
              <FontAwesomeIcon
                icon={faEllipsis}
                onClick={() => {
                  setSelectedItem(item); // Set the selected item
                  setFoodDialogVisible(true); // Open the dialog
                  setHasFetched(false);
                }}
              />
            </span>
          </div>
          <span id="mealplan-tag" className={item.tag}>
            {item.tag}
          </span>
          {item.foodImage ? (
            <img
              src={item.foodImage}
              alt={item.foodName}
              style={{ width: "100%", marginTop: "0.5rem" }}
            />
          ) : (
            <div>
              <br />
              <br />
            </div>
          )}
          <div className="mealplan-nutriscore-img">
            <div id="mealplan-nutriinfo">
              <span id="nutriscore">
                <FontAwesomeIcon icon={faFireFlameCurved} id="caloriesIcon" />
                <div className="nutriscore-font">
                  {nutritionalData[item.foodName]
                    ? `${nutritionalData[item.foodName].kcalValue} Kcal`
                    : "-"}
                </div>{" "}
              </span>
              <a href="/Profile">
                <Avatar
                  image={userImage}
                  size="large"
                  shape="circle"
                  style={{ width: "35px", height: "35px" }}
                />
              </a>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div>
      <div className="weekly-plan">
        {daysOfWeek.map((day) => (
          <div key={day} id={day}>
            <div className="day-of-week">
              <p>{day.charAt(0).toUpperCase() + day.slice(1)}</p>
            </div>
            {renderMealsForDay(day)}
          </div>
        ))}
      </div>
    </div>
  );
}
