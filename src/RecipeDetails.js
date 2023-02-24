import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

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
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
      options
    )
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) {
    return <div>Loading recipe details...</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="recipe-container">
        <h3>{recipe.title}</h3>
        <div className="recipe-image">
          <img className="recipe-image" src={recipe.image} alt={recipe.title} />
        </div>
        <div className="recipe-ingredients">
          <h5>Ingredients</h5>
          <hr />
          <div className="recipe-description">
            <ul>
              {recipe.extendedIngredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount.toFixed(2) + " "}
                  {ingredient.measures.metric.unitLong + " "}
                  {"of "}
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="recipe-description">
          <h5>Preparation</h5>
          <hr />
          {recipe.analyzedInstructions[0]?.steps ? (
            <div className="recipe-instructions">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li className="recipe-instruction" key={step.number}>
                  {step.step}
                </li>
              ))}
            </div>
          ) : (
            <p>No instructions found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
