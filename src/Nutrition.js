import React, { useState, useEffect } from "react";
import "./CSS/nutrition.css";

function Nutrition(id) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fb001be2b1msh0dad1175cc02e0dp10a90bjsn3d7b7ed2bb19",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id.id}/nutritionWidget.json`,
      options
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h5>General Nutrients</h5>
      <div className="generic-nutrition">
        <p>
          <b>Calories: </b>
          {recipes.calories}
        </p>
        <p>
          <b>Carbs: </b>
          {recipes.carbs}
        </p>
        <p>
          <b>Fat: </b>
          {recipes.fat}
        </p>
        <p>
          <b>Protein: </b>
          {recipes.protein}
        </p>
      </div>
      <h2>Healthy Nutrients</h2>
      <table>
        <thead>
          <tr>
            <th>Nutrients</th>
            <th>Amount</th>
            <th>Daily Need (%)</th>
          </tr>
        </thead>
        <tbody>
          {recipes.good &&
            recipes.good.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td>{item.percentOfDailyNeeds}%</td>
              </tr>
            ))}
        </tbody>
      </table>
      <hr />
      <h2>Unhealthy Nutrients</h2>
      <table>
        <thead>
          <tr>
            <th>Nutrients</th>
            <th>Amount</th>
            <th>Daily Need (%)</th>
          </tr>
        </thead>
        <tbody>
          {recipes.bad &&
            recipes.bad.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td>{item.percentOfDailyNeeds}%</td>
              </tr>
            ))}
        </tbody>
      </table>
      {console.log(recipes)}
    </div>
  );
}

export default Nutrition;
