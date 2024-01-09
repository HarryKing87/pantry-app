import React, { useState, useEffect } from "react";
import { ToggleButton } from "primereact/togglebutton";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { auth } from "../Database/firebase";
import { useNavigate } from "react-router-dom";
/* React Toastify Notifications Imports */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "../CSS/dark-mode.css";

const db = getFirestore();

function EditProfile() {
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [darkModeChecked, setdarkModeChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        getDocs(q)
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              // New user, create a new document
              setDoc(userRef, {
                userImage: imageUrl,
                isDarkModeEnabled: darkModeChecked,
              });
            } else {
              // Existing user, update fields in the document
              const data = querySnapshot.docs[0].data();
              updateUserData(userRef, {
                userImage: imageUrl || data.imageUrl,
                isDarkModeEnabled: darkModeChecked || data.isDarkModeEnabled,
              });
              setdarkModeChecked(data.isDarkModeEnabled);
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

  const updateUserData = async (userRef, dataToUpdate) => {
    try {
      await updateDoc(userRef, dataToUpdate);
      console.log("User data updated successfully!");
      toast.success("Profile updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      // If imageUrl exists in dataToUpdate, update it separately
      if (dataToUpdate.userImage) {
        await updateDoc(userRef, { userImage: dataToUpdate.userImage });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleProfileSave = () => {
    let isValid = true;
    // When arriving at the Edit Profile, fill in the data already known
    if (isValid && user) {
      const userRef = doc(db, "users", user.uid);
      updateUserData(userRef, {
        userImage: imageUrl,
        isDarkModeEnabled: darkModeChecked,
      });
    }
  };

  // get user image from PC to show on Avatar
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result); // Store the data URL in the state
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (darkModeChecked) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkModeChecked]);

  return (
    <div>
      <form className="edit-profile-container">
        <label>Profile Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </form>
      <button
        type="button"
        style={{ background: "#4caf50" }}
        onClick={handleProfileSave}
      >
        Save
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default EditProfile;
