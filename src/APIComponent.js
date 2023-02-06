import React, { useState, useEffect } from "react";
import fetchData from "./TastyAPI.js";
import "./CSS/apiComponent.css";
import SearchAPI from "./SearchAPI";

// Formatting the date we receive from the API call
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
}

function APIComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [setTipBody] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const json = await fetchData();
        console.log(json);
        setData(json);
        setTipBody(json.results[0].tip_body);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    getData();
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      {data.results.map((result, index) => (
        <div key={index} className="post">
          <div className="post-header">
            <div className="avatar-img">
              <img
                src={result.author_avatar_url}
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <h2>
              {result.author_name === "" ? "Anonymous" : result.author_name}
            </h2>
            <div className="post-meta">{formatDate(result.updated_at)}</div>
          </div>
          <div className="post-body">
            <p>{result.tip_body}</p>
          </div>
          <div className="post-likes">
            <p>Likes: {result.upvotes_total}</p>
            <SearchAPI props={parseInt(result.recipe_id)}>
              <a href="/">
                <p>Recipe: {result.recipe_id}</p>
              </a>
            </SearchAPI>
          </div>
        </div>
      ))}
    </div>
  );
}

export default APIComponent;
