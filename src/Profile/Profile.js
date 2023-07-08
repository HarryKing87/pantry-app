import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../Database/firebase";
import { useNavigate } from "react-router-dom";
import "../CSS/profile.css";
/* Checkbox styling */
import { Checkbox } from "primereact/checkbox";

const db = getFirestore();

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allergies, setAllergies] = useState({
    peanuts: false,
    dairy: false,
    gluten: false,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        getDocs(q)
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              setDoc(userRef, { id: user.uid, allergies });
            } else {
              const data = querySnapshot.docs[0].data();
              setAllergies(data.allergies);
            }
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
          });
      } else {
        setUser(null);
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  function handleAllergyChange(event) {
    const { name, checked } = event.target;
    setAllergies((prevState) => ({ ...prevState, [name]: checked }));
  }

  function handleSave() {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      updateDoc(userRef, { allergies })
        .then(() => {
          console.log("Allergy data saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving allergy data:", error);
        });
    }
  }

  // SIGN OUT FUNCTIONALITY
  let logoutTimeout;

  // Function to reset the logout timer
  function resetLogoutTimer() {
    clearTimeout(logoutTimeout);
    logoutTimeout = setTimeout(handleSignOut, 3 * 60 * 60 * 1000); // 3 hours
  }

  // Function to handle user activity
  function handleUserActivity() {
    resetLogoutTimer();
  }

  // Function to handle user logout
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out user:", error);
      });
  }

  // Add event listeners to reset the logout timer on user activity
  document.addEventListener("mousemove", handleUserActivity);
  document.addEventListener("keydown", handleUserActivity);

  // Call resetLogoutTimer() initially to start the logout timer
  resetLogoutTimer();
  if (!user) {
    return null;
  }

  return (
    <div className="navigation-container">
      <Navigation />
      <div className="Profile">
        <h1>Profile</h1>
        <form className="form-container">
          <div className="form-row">
            <label>
              <Checkbox
                inputId="peanuts"
                name="peanuts"
                checked={allergies.peanuts}
                onChange={handleAllergyChange}
                className="checkbox-allergies"
              />
              <span className="p-checkbox-label">Peanuts</span>
            </label>
            <label>
              <Checkbox
                inputId="dairy"
                name="dairy"
                checked={allergies.dairy}
                onChange={handleAllergyChange}
                className="checkbox-allergies"
              />
              <span className="p-checkbox-label">Dairy</span>
            </label>
            <label>
              <Checkbox
                inputId="gluten"
                name="gluten"
                checked={allergies.gluten}
                onChange={handleAllergyChange}
                className="checkbox-allergies"
              />
              <span className="p-checkbox-label">Gluten</span>
            </label>
          </div>
          <div className="form-actions">
            <button type="button" onClick={handleSave}>
              Save Allergies
            </button>
            <button type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
