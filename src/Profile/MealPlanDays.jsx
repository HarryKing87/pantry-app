import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faEllipsis,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "primereact/avatar";
import { useState, useEffect } from "react";

export default function MealPlanDays({ meal, userImage }) {
  // State to store the fetched data
  const [nutritionalData, setNutritionalData] = useState({});
  const [mealLoading, setMealLoading] = useState(true);
  const [mealError, setMealError] = useState(null);
  // State to track if data has been fetched
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchNutritionalData = async () => {
      if (!meal || meal.length === 0 || hasFetched) {
        return; // Exit if meal data is not available
      }
      setMealLoading(true);
      try {
        const fetchPromises = meal.map(async (item) => {
          const foodName = encodeURIComponent(item.foodName);
          const response = await fetch(
            `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=6jaxoYBjQGg51OL2IvFCk8nqzx6o0MbwV4sqt5eW&query=${foodName}`
          );
          console.log("Response: ", response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();

          // Assuming the first result is the relevant one
          if (
            result.foods &&
            result.foods[0] &&
            result.foods[0].foodNutrients
          ) {
            const kcalNutrient = result.foods[0].foodNutrients.find(
              (nutrient) => nutrient.nutrientName === "Energy"
            );
            return {
              foodName: item.foodName,
              kcalValue: kcalNutrient ? kcalNutrient.value : "N/A",
            };
          }
          return {
            foodName: item.foodName,
            kcalValue: "N/A",
          };
        });

        // Resolve all promises
        const results = await Promise.all(fetchPromises);

        // Map results to nutritionalData
        const nutritionalMap = results.reduce(
          (acc, { foodName, kcalValue }) => {
            acc[foodName] = kcalValue;
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
  }, [meal, hasFetched]);

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const renderMealsForDay = (day) => {
    return meal
      .filter((item) => item.selectedDay.name.toLowerCase() === day)
      .map((item, index) => (
        <div key={index} id="mealplan-task">
          <div className="mealplan-title">
            <h3>{item.foodName}</h3>
            <span>
              <FontAwesomeIcon icon={faEllipsis} />
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
                    ? `${nutritionalData[item.foodName]} Kcal`
                    : "N/A"}
                </div>{" "}
                {/* Display Kcal value */}
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
