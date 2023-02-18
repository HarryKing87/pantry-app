import { useState, useEffect } from "react";
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
import Navigation from "../Navigation";

const AllergyList = () => {
  const [allergies, setAllergies] = useState([
    { name: "Peanuts", checked: false },
    { name: "Shellfish", checked: false },
    { name: "Eggs", checked: false },
    { name: "Dairy", checked: false },
    { name: "Wheat", checked: false },
    { name: "Soy", checked: false },
  ]);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("Signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleCheckboxChange = (index) => {
    const updatedAllergies = allergies.map((allergy, i) =>
      i === index ? { ...allergy, checked: !allergy.checked } : allergy
    );
    setAllergies(updatedAllergies);
  };

  const fetchAllergies = async () => {
    try {
      const db = getFirestore();
      const customerCollection = collection(db, "customers");
      const q = query(
        customerCollection,
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Update the allergies state with the data retrieved from the database
        const customerDoc = querySnapshot.docs[0];
        const customerData = customerDoc.data();
        const updatedAllergies = allergies.map((allergy) => {
          if (allergy.name in customerData.allergies) {
            return {
              ...allergy,
              checked: customerData.allergies[allergy.name],
            };
          } else {
            return allergy;
          }
        });
        setAllergies(updatedAllergies);
      }
    } catch (error) {
      console.log("Error fetching allergies: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getFirestore();
      const customerCollection = collection(db, "customers");
      const q = query(
        customerCollection,
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Create new customer document if not exists
        const newCustomer = {
          userId: auth.currentUser.uid,
          allergies: allergies.reduce((obj, allergy) => {
            obj[allergy.name] = allergy.checked;
            return obj;
          }, {}),
        };
        await setDoc(doc(customerCollection), newCustomer);
      } else {
        // Update existing customer document
        const customerDoc = querySnapshot.docs[0];
        await updateDoc(doc(customerCollection, customerDoc.id), {
          allergies: allergies.reduce((obj, allergy) => {
            obj[allergy.name] = allergy.checked;
            return obj;
          }, {}),
        });
      }
      alert("Allergies saved successfully!");
    } catch (error) {
      console.log("Error saving allergies: ", error);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      fetchAllergies();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navigation />
      <h1>Allergies</h1>
      <form className="allergy-form" onSubmit={handleSubmit}>
        {allergies.map((allergy, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={allergy.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            <label>{allergy.name}</label>
          </div>
        ))}
        <button className="submit-button" type="submit">
          Save Allergies
        </button>
      </form>
      <p className="logout-link" onClick={handleLogout}>
        LOGOUT
      </p>
    </div>
  );
};

export default AllergyList;
