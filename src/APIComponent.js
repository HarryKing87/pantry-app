import React, { useState, useEffect } from "react";
import "./CSS/apiComponent.css";
import { Link } from "react-router-dom";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "fb001be2b1msh0dad1175cc02e0dp10a90bjsn3d7b7ed2bb19",
    "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

const Recipe = (props) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=1",
        options
      );
      const data = await response.json();
      setRecipe(data.recipes[0]);
    };

    getRecipe();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getRecipe();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [recipe]);

  const getRecipe = async () => {
    const response = await fetch(
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
      options
    );
    const data = await response.json();
    setRecipe(data.recipes[0]);
    console.log(data.recipes[0]); // TEST
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-container">
      <div className="recipe-title-image">
        <h3>{recipe.title}</h3>
        <div className="recipe-image">
          <img className="recipe-image" src={recipe.image} alt={recipe.title} />
        </div>
      </div>
      <div className="recipe-description">
        <h4 className="recipe-description-title">Description</h4>
        <p
          dangerouslySetInnerHTML={{
            __html: recipe.summary.split(" ").slice(0, 50).join(" ") + "...",
          }}
        ></p>

        <div className="recipe-pageRedirect">
          <button style={{ color: "white" }}>
            <Link
              to={`/recipe/${recipe.id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              View Recipe
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
