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

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out user:", error);
      });
  }

  if (!user) {
    return null;
  }

  return (
    <div className="navigation-container">
      <Navigation />
      <div className="Profile">
        <h1>Profile</h1>
        <form>
          <label>
            <input
              type="checkbox"
              name="peanuts"
              checked={allergies.peanuts}
              onChange={handleAllergyChange}
            />
            Peanuts
          </label>
          <label>
            <input
              type="checkbox"
              name="dairy"
              checked={allergies.dairy}
              onChange={handleAllergyChange}
            />
            Dairy
          </label>
          <label>
            <input
              type="checkbox"
              name="gluten"
              checked={allergies.gluten}
              onChange={handleAllergyChange}
            />
            Gluten
          </label>
          <button type="button" onClick={handleSave}>
            Save Allergies
          </button>
          <button type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
