import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import "../CSS/profile.css";
import {  signOut } from "firebase/auth";
import {auth} from '../Database/firebase';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  let loggedUser = localStorage.getItem("email");
  const navigate = useNavigate();

  /* Allergies Development */
  const allergies = [
    "Peanuts",
    "Shellfish",
    "Tree nuts",
    "Eggs",
    "Milk",
    "Soy",
    "Wheat",
    "Fish",
    "Sesame",
  ];

  const [hasAllergies, setHasAllergies] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [setLoggedUser] = useState("");
  const [savedAllergies, setSavedAllergies] = useState(false);

  const handleAllergySelection = (e) => {
    setHasAllergies(true);
    setSelectedAllergies([...selectedAllergies, e.target.value]);
  };

  const handleSaveAllergies = () => {
    localStorage.setItem(
      `${loggedUser}_allergies`,
      JSON.stringify(selectedAllergies)
    );
    setShowSaveButton(false);
    setSavedAllergies(true);
  };

  const handleUser = (e) => {
    setLoggedUser(e.target.value);
  };

  useEffect(() => {
    const userAllergies = JSON.parse(
      localStorage.getItem(`${loggedUser}_allergies`)
    );
    if (userAllergies) {
      setSelectedAllergies(userAllergies);
      setHasAllergies(true);
      setSavedAllergies(true);
    }
  }, [loggedUser]);

  // Database Sign out Functionality
  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        alert("Signed out successfully")
        navigate("/login");
    }).catch((error) => {
    // An error happened.
    });
}

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
        <h5>Welcome, {loggedUser}!</h5>
        <i onClick={handleLogout} style={{cursor: 'pointer'}}>Sign Out</i>
        <p>
          <i>
            This page is still under development and will take some time until I
            figure out what to insert.
          </i>
        </p>
      </div>
      <div className="allergies-table allergies-container">
        {!savedAllergies && (
          <>
            <h2>Please enter your name</h2>
            <input type="text" onChange={handleUser} />
            <h2>Do you have any allergies?</h2>
            <div className="checkbox-grid">
              {allergies.map((allergy) => (
                <label key={allergy}>
                  <input
                    type="checkbox"
                    value={allergy}
                    onChange={handleAllergySelection}
                    checked={selectedAllergies.includes(allergy)}
                    className="larger-checkbox"
                  />
                  {allergy}
                </label>
              ))}
            </div>
            {showSaveButton && (
              <button onClick={handleSaveAllergies}>Save Allergies</button>
            )}
          </>
        )}

        {hasAllergies && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Allergies</th>
                </tr>
              </thead>
              <tbody>
                {selectedAllergies.map((allergy) => (
                  <tr key={allergy}>
                    <td>{allergy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
