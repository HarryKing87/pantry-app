import "../CSS/mealPlanFoodInfo.css";
import { useState } from "react";

/**
 * MealPlanFoodInfo component displays the food information when the user clicks on the meal name.
 * It takes the following props:
 * - item: an object containing the food name and its corresponding nutrients and ingredients
 * - nutriData: an object containing the nutrients information
 * - servings: an object containing the serving size and unit information
 * - ingredients: an object containing the ingredients information
 *
 * It displays the food information in three sections: Notes, Ingredients and Nutrients.
 * The Notes section displays the notes written by the user.
 * The Ingredients section displays the ingredients of the food.
 * The Nutrients section displays the nutrients of the food.
 *
 * The user can click on each section to view more details. When the user clicks on the Notes section,
 * it displays the notes written by the user. When the user clicks on the Ingredients section,
 * it displays the ingredients of the food. When the user clicks on the Nutrients section,
 * it displays the nutrients of the food in a table.
 */

export default function MealPlanFoodInfo({
  item,
  nutriData,
  servings,
  ingredients,
}) {
  const [selectedInfo, setSelectedInfo] = useState("nutrients"); // default is always nutrients

  const handleInfoClick = (info) => {
    setSelectedInfo(info);
  };

  return (
    <div>
      <div className="foodInfo-general">
        <div
          class="box-info"
          onClick={() => handleInfoClick("notes")}
          style={{ display: item.notes ? "" : "none" }}
        >
          <h4>Notes</h4>
          <p>{item.notes}</p>
        </div>
        <div
          class="box-info"
          onClick={() => handleInfoClick("ingredients")}
          style={{ display: ingredients[item.foodName] ? "" : "none" }}
        >
          <h4>Ingredients</h4>
          {Object.entries(ingredients[item.foodName] || {}).map(
            ([ingredient, value]) => (
              <p key={ingredient}>{value}</p>
            )
          )}
        </div>
        <div
          class="box-info"
          onClick={() => handleInfoClick("nutrients")}
          style={{ display: nutriData[item.foodName] ? "" : "none" }}
        >
          <h4>Nutrients</h4>
          {Object.entries(nutriData[item.foodName] || {})
            .slice(0, 3)
            .map(([nutrient, value]) => {
              // Removing the value that has 0 as the value
              if (value === 0) {
                return null;
              } else {
                return (
                  <p>
                    {nutrient}: {value}
                  </p>
                );
              }
            })}
        </div>
      </div>

      <div>
        {item.notes && selectedInfo === "notes" && (
          <div className="notes">
            <p>{item.notes}</p>
          </div>
        )}
        {selectedInfo === "ingredients" && (
          <div className="ingredients-list">
            <ul>
              {Object.entries(ingredients[item.foodName] || {}).map(
                ([ingredient, value]) => {
                  const values = value.split(",").map((v) => v.trim());
                  return values.map((v) => <li key={v}>{v}</li>);
                }
              )}
            </ul>
          </div>
        )}
        {selectedInfo === "nutrients" && (
          <table style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>
                  {item.foodName}{" "}
                  {Object.entries(servings[item.foodName] || {}).map(
                    ([servings, value]) =>
                      value === "servings" ? (
                        ""
                      ) : (
                        <span style={{ fontSize: "10px" }} key={servings}>
                          {value}
                        </span>
                      )
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(nutriData[item.foodName] || {}).map(
                ([nutrient, value]) => {
                  // Removing the value that has 0 as the value
                  if (value === 0) {
                    return null;
                  } else {
                    return (
                      <tr key={nutrient}>
                        <td>{nutrient}</td>
                        <td>{value}</td>
                      </tr>
                    );
                  }
                }
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
