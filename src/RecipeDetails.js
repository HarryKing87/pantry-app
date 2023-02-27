import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";
import "./CSS/recipeDetails.css";
import Nutrition from "./Nutrition";

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
      <article className="recipe">
        <h2 className="recipe-title">{recipe.title}</h2>
        <header>
          <img
            className="recipe-details-image"
            src={recipe.image}
            alt={recipe.title}
          />
          <div className="general-description-tab">
            <div className="recipe-image-summary">
              <p
                dangerouslySetInnerHTML={{
                  __html: recipe.summary,
                }}
              ></p>
            </div>
            <div className="recipe-general-information">
              <p>
                Servings: <b>{recipe.servings}</b>
              </p>
              {recipe.glutenFree ? <p>Gluten Free</p> : <p>Not gluten free</p>}
              {recipe.vegan ? (
                <p>{recipe.vegan}</p>
              ) : (
                <p>{recipe.vegetarian}</p>
              )}
              <p>
                Likes: <b>{recipe.aggregateLikes}</b>
              </p>
              <p>
                Ready in <b>{recipe.readyInMinutes}</b>'
              </p>
            </div>
          </div>
        </header>
        <div className="recipe-information">
          <div className="recipe-ingredients">
            <h3>Ingredients</h3>
            <ul>
              {recipe.extendedIngredients.map((ingredient, index) => (
                <li key={index} className="recipe-ingredient">
                  <span className="recipe-ingredient-amount">
                    {ingredient.amount.toFixed(2)}{" "}
                  </span>
                  <span className="recipe-ingredient-unit">
                    {ingredient.measures.metric.unitLong}{" "}
                  </span>
                  <span className="recipe-ingredient-name">
                    of {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="recipe-preparation">
            <h3>Preparation</h3>
            <div>
              {recipe.analyzedInstructions[0]?.steps ? (
                <ol>
                  {recipe.analyzedInstructions[0].steps.map((step) => (
                    <li key={step.number}>{step.step}</li>
                  ))}
                </ol>
              ) : (
                <p>No instructions found.</p>
              )}
            </div>
          </div>
        </div>

        <div className="recipe-detailed-instructions">
          {recipe.diets === null ? <h4>Suitable for diets</h4> : ""}
          {recipe.diets === null ? (
            <ul>
              {recipe.diets.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>

        <div className="similar-recipes-container">
          <Nutrition id={recipe.id} />
          {console.log("The recipe id: " + recipe.id)}
        </div>
      </article>
    </div>
  );
}

export default RecipeDetails;
