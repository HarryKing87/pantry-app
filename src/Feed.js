import APIComponent from "./APIComponent";
import React from "react";

const Feed = () => {
  const styles = {
    maxWidth: "90%",
    width: "100%",
    textAlign: "left",
    padding: "0",
    margin: "10% auto",
    color: "black",
  };
  return (
    <div style={styles}>
      <APIComponent />
    </div>
  );
};

export default Feed;
