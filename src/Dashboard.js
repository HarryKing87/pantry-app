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
  image1 = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
  image2 = "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  image3 = "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=300&q=60",
  image4 = "https://images.unsplash.com/photo-1571342579397-fe16329793bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
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
        <img
          src={image1}
          style={{
            height: "200px",
            width: "200px",
            "margin-right": "10px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          alt=""
        />
        <img
          src={image2}
          style={{
            height: "200px",
            width: "200px",
            "margin-right": "10px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          alt=""
        />
        <img
          src={image3}
          style={{
            height: "200px",
            width: "200px",
            "margin-right": "10px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          alt=""
        />
        <img
          src={image4}
          style={{
            height: "200px",
            width: "200px",
            "margin-right": "10px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          alt=""
        />
        <img
          src={image5}
          style={{
            height: "200px",
            width: "200px",
            "margin-right": "10px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          alt=""
        />
        <img
          src={image6}
          style={{
            height: "200px",
            width: "200px",
            "margin-right": "10px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          alt=""
        />
      </ContainerDiv>
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
    </div>
  );
};

export default ImageScroller;
