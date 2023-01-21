import Navigation from "./Navigation";
import "./CSS/dashboard.css";
import React, { useRef } from "react";
import styled from "styled-components";

const ContainerDiv = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  width: 500px;
  max-width: 100%;
  margin: 15% auto;
  border-radius: 10px;
  padding: 0;
`;

function handleDelete() {
  let text = document.getElementById("text");
  let buttonNext = document.getElementById("buttonNext");
  let buttonPrevious = document.getElementById("buttonPrevious");
  let newText =
    "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. -Steve Jobs";
  const textElement = document.getElementById("text");
  textElement.style.transition = "all 0.5s ease-out";
  textElement.style.transform = "translateX(-100%)";
  textElement.style.opacity = "0";

  // Wait for the text to slide out
  setTimeout(() => {
    text = newText;
    textElement.innerHTML = text;
    textElement.style.transition = "all 0.5s ease-in";
    textElement.style.transform = "translateX(0%)";
    textElement.style.opacity = "1";
  }, 500);
  buttonNext.style.display = "none";
  buttonPrevious.style.display = "block";
}

/* SELECT dropdown functionality */

// function to handle the click event of the button
function putOptionToGrid() {
  // Get the selected option from the select dropdown field
  var select = document.getElementById("mySelect");
  var selectedOption = select.options[select.selectedIndex].value;

  // Get the grid element
  var grid = document.getElementById("grid");

  // Get the current elements of the grid
  var gridElements = document.getElementsByClassName("grid-item");

  // Check if the grid is full
  if (gridElements.length >= 6) {
    alert("Grid is full!");
    return;
  }
  // Create a new div element to hold the selected option
  var newDiv = document.createElement("div");
  newDiv.className = "grid-item";
  newDiv.innerHTML = selectedOption;

  // Add the new div element to the grid
  grid.appendChild(newDiv);

  // Get the current values stored in local storage
  var storedValues = JSON.parse(localStorage.getItem("selectedOptions")) || [];

  // Add the selected option to the stored values
  storedValues.push(selectedOption);

  // Save the updated values to local storage
  localStorage.setItem("selectedOptions", JSON.stringify(storedValues));
}

function retrieveLocalStorageValues() {
  // Get the grid element
  var grid = document.getElementsByClassName("show-in-grid")[0];

  // Get the values stored in local storage
  var storedValues = JSON.parse(localStorage.getItem("selectedOptions")) || [];

  // Remove duplicates
  var filteredValues = storedValues.filter(
    (item, index) => storedValues.indexOf(item) === index
  );

  // Create a string to hold the HTML for the grid items
  var gridHTML = "";

  // Loop through the stored values and add them to the grid HTML
  for (var i = 0; i < filteredValues.length; i++) {
    gridHTML += `<div class="grid-item">${filteredValues[i]}</div>`;
  }

  // Set the innerHTML of the grid element to the grid HTML
  grid.innerHTML = gridHTML;
}

window.onload = function () {
  setTimeout(retrieveLocalStorageValues, 1500);
};

/* END of SELECT dropdown functionality */

function setBackgroundImage() {
  var gridItems = document.getElementsByClassName("grid-item");
  for (var i = 0; i < gridItems.length; i++) {
    if (gridItems[i].innerHTML === "Fruits") {
      gridItems[i].style.backgroundImage =
        "url('https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJ1aXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60')";
      gridItems[i].innerHTML = "";
    } else if (gridItems[i].innerHTML === "Vegetables") {
      gridItems[i].style.backgroundImage =
        "url('https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60')";
      gridItems[i].innerHTML = "";
    } else if (gridItems[i].innerHTML === "Dairy") {
      gridItems[i].style.backgroundImage =
        "url('https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRhaXJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60')";
      gridItems[i].innerHTML = "";
    } else if (gridItems[i].innerHTML === "Meat") {
      gridItems[i].style.backgroundImage =
        "url('https://images.unsplash.com/photo-1603048297172-c92544798d5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1lYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60')";
      gridItems[i].innerHTML = "";
    } else {
      alert("The photo you requested hasn't been found!");
    }
  }
}

setTimeout(setBackgroundImage, 1550);

function backText() {
  let text = document.getElementById("text");
  let buttonNext = document.getElementById("buttonNext");
  let buttonPrevious = document.getElementById("buttonPrevious");
  let newText =
    "Just relax and not overthink what to eat. This is in our side with our personalized meal plans just prepared and adapted to your needs.";
  const textElement = document.getElementById("text");
  textElement.style.transition = "all 0.5s ease-out";
  textElement.style.transform = "translateX(-100%)";
  textElement.style.opacity = "0";

  // Wait for the text to slide out
  setTimeout(() => {
    text = newText;
    textElement.innerHTML = text;
    textElement.style.transition = "all 0.5s ease-in";
    textElement.style.transform = "translateX(0%)";
    textElement.style.opacity = "1";
  }, 500);
  buttonNext.style.display = "block";
  buttonPrevious.style.display = "none";
}

const ImageScroller = ({
  image1 = "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJ1aXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  image2 = "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
  image3 = "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRhaXJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  image4 = "https://images.unsplash.com/photo-1603048297172-c92544798d5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1lYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  image5 = "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
  image6 = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
}) => {
  const scrollerRef = useRef(null);

  function getMealGreeting() {
    let time = new Date().getHours();
    let message;
    if (time >= 5 && time < 12) {
      message = "Good morning, it's breakfast time!";
    } else if (time >= 12 && time < 17) {
      message = "Good afternoon, it's lunch time!";
    } else {
      message = "Good evening, it's dinner time!";
    }
    return message;
  }

  return (
    <div>
      <Navigation />
      <ContainerDiv ref={scrollerRef}>
        <div className="image-container">
          <a href="/fruits" className="show-label">
            <img
              src={image1}
              style={{
                height: "200px",
                width: "200px",
                "margin-right": "20px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              className="fruits"
              alt=""
            />
            <span className="text-overlay">Fruits</span>
          </a>
        </div>

        <div className="image-container">
          <a href="/vegetables">
            <img
              src={image2}
              style={{
                height: "200px",
                width: "200px",
                "margin-right": "20px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              alt=""
            />
            <span className="text-overlay">Vegetables</span>
          </a>
        </div>
        <div className="image-container">
          <a href="/dairy">
            <img
              src={image3}
              style={{
                height: "200px",
                width: "200px",
                "margin-right": "20px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              alt=""
            />
            <span className="text-overlay">Dairy</span>
          </a>
        </div>
        <div className="image-container">
          <a href="/meat">
            <img
              src={image4}
              style={{
                height: "200px",
                width: "200px",
                "margin-right": "20px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
              alt=""
            />
            <span className="text-overlay">Meat</span>
          </a>
        </div>
        <a href="/">
          <img
            src={image5}
            style={{
              height: "200px",
              width: "200px",
              "margin-right": "20px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            alt=""
          />
        </a>
        <a href="/">
          <img
            src={image6}
            style={{
              height: "200px",
              width: "200px",
              "margin-right": "20px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            alt=""
          />
        </a>
      </ContainerDiv>

      {/* Show hero component with quotes */}
      <div className="container-greeting-dashboard">{getMealGreeting()}</div>
      <div className="container-description-dashboard" id="text">
        Just relax and not overthink what to eat. This is in our side with our
        personalized meal plans just prepared and adapted to your needs.
      </div>
      <button
        type="button"
        className="container-dashboard-buttonPrevious"
        id="buttonPrevious"
        onClick={backText}
        style={{ display: "none" }}
      >
        Previous
      </button>
      <button
        type="button"
        className="container-dashboard-buttonNext"
        id="buttonNext"
        onClick={handleDelete}
      >
        Next
      </button>
      <br />
      <br />
      <br />
      <br />
      <div className="container-dashboard-selection-box">
        <select id="mySelect">
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
        </select>
        <button onClick={putOptionToGrid} id="addPreferredButton">
          ADD
        </button>

        <div
          id="grid"
          className="show-in-grid"
          style={{
            display: "grid",
            "grid-template-columns": "1fr 1fr 1fr",
            "grid-template-rows": "1fr 1fr 1fr",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ImageScroller;
