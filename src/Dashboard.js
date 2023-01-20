import React from "react";
import Navigation from "./Navigation";
import "./CSS/dashboard.css";
import { useState } from "react";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const removePantry = () => {
    document.querySelector(".pantry-tobe-added").innerHTML = "";
  };

  const showFood = () => {
    let foodInsertion = document.querySelector(".foodInserted").value;
    const newItem = document.createElement("li");
    newItem.classList.add("pantry-item");
    newItem.innerHTML = foodInsertion;
    let pantryToBeAdded = document.querySelector(".pantry-tobe-added");
    pantryToBeAdded.appendChild(newItem);
    handleCloseModal();
  };

  return (
    <div>
      <Navigation />
      <div className="addFood">
        <button onClick={handleOpenModal}>Add</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h1>Add Food.</h1>
            <input
              className="foodInserted"
              type="text"
              placeholder="Type of food"
            />
            <button
              onClick={showFood}
              style={{ margin: "5% auto" }}
              id="addFood-button"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="container-pantry">
        <div className="content-cleaner" onClick={removePantry}>
          Clean
        </div>
        <ul className="pantry-tobe-added"></ul>
      </div>
    </div>
  );
}

export default Dashboard;
