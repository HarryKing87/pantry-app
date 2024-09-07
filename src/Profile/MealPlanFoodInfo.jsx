import "../CSS/mealPlanFoodInfo.css";

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
                <th>{item.foodName}</th>
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
