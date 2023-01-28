import React, { useState, useEffect } from "react";

function SeachAPI(props) {
  const [recipeId, setRecipeId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8b80fcf050msh127c9a16542ed70p1442e7jsnd4a62381705d",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (recipeId) {
          const response = await fetch(
            `https://tasty.p.rapidapi.com/recipes/list-similarities?recipe_id=${props}`,
            options
          );
          const json = await response.json();
          setData(json);
        }
      } catch (err) {
        setError(err);
      }
    }
    fetchData();
  }, [recipeId]);

  function handleClick(id) {
    setRecipeId(id);
  }

  return (
    <div>
      <a href="#" target={"_blank"} onClick={() => handleClick(props)}>
        Recipe
      </a>
      {error && <div>Error: {error.message}</div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
}

export default SeachAPI;
