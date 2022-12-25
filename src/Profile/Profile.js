import React from "react";
import Navigation from "../Navigation";
import "../CSS/profile.css";

export default function Profile(props) {
  let loggedUser = localStorage.getItem("username");
  return (
    <div>
      <Navigation />
      <h1>Profile.</h1>
      <div className="showProfileName">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-6073860-4996977.png"
          alt="profile user icon"
          width={"40px"}
          height={"40px"}
        />
        <h4>Welcome, {loggedUser}!</h4>
      </div>
    </div>
  );
}
