import React from "react";
import Navigation from "../Navigation";
import "../CSS/profile.css";

export default function Profile(props) {
  let loggedUser = localStorage.getItem("username");
  return (
    <div>
      <Navigation />
      <div className="showProfileName">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-6073860-4996977.png"
          alt="profile user icon"
          width={"40px"}
          height={"40px"}
        />
        <h4>Welcome, {loggedUser}!</h4>
        <p>
          <i>
            This page is still under development and will take some time until I
            figure out what to insert.
          </i>
        </p>
      </div>
    </div>
  );
}
