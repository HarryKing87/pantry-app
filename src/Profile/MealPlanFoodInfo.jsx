import "../CSS/mealPlanFoodInfo.css";

/**
 * @function MealPlanFoodInfo
 * @description A component that displays a paragraph of text about meal planning
 * and a table of nutrient information for a given food item, if the food item
 * exists in the nutriData object.
 * @param {Object} item - An object with a foodName property.
 * @param {Object} nutriData - An object with food names as keys and nutrient
 * data as values.
 * @returns {JSX.Element} A JSX element containing a paragraph and a table, or
 * just a paragraph if nutriData is empty.
 */
export default function MealPlanFoodInfo({ item, nutriData }) {
  return (
    <div>
      <div className="foodInfo-general">
        <p>
          Want to dive deeper into the food choices in your meal planner? Unlock
          a new level of understanding about what you consume, with detailed
          insights into the nutrients of every item in your plan. Pantry
          captures all this data seamlessly, just for you. Take your time, plan
          with precision, and schedule effortlessly. We're thrilled to have you
          here!
        </p>
      </div>

      <div>
        {/* Render nutrient table if nutriData exists */}
        {nutriData && item.foodName && (
          <table>
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>
                  {item.foodName}: {item.servingSize}({item.servingSizeUnit})
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(nutriData[item.foodName] || {}).map(
                ([nutrient, value]) => (
                  <tr key={nutrient}>
                    <td>{nutrient}</td>
                    <td>{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
