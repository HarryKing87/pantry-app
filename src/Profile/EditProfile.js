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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // Validation states
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
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
                firstname: firstName,
                lastname: lastName,
                mail: email,
                username: username,
                userImage: imageUrl,
                isDarkModeEnabled: darkModeChecked,
              });
            } else {
              // Existing user, update fields in the document
              const data = querySnapshot.docs[0].data();
              updateUserData(userRef, {
                firstname: firstName || data.firstname,
                lastname: lastName || data.lastname,
                mail: email || data.mail,
                username: username || data.username,
                userImage: imageUrl || data.imageUrl,
                isDarkModeEnabled: darkModeChecked || data.isDarkModeEnabled,
              });
              setFirstName(data.firstname);
              setLastName(data.lastname);
              setEmail(data.mail);
              setUsername(data.username);
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

    // Validation for First Name
    if (!/^[A-Za-z]{1,30}$/.test(firstName)) {
      setFirstNameError(
        "Please enter only letters with a maximum of 30 characters"
      );
      isValid = false;
    } else {
      setFirstNameError("");
    }

    // Validation for Last Name
    if (!/^[A-Za-z]{1,30}$/.test(lastName)) {
      setLastNameError(
        "Please enter only letters with a maximum of 30 characters"
      );
      isValid = false;
    } else {
      setLastNameError("");
    }

    // Validation for Email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validation for Username
    if (!/^[A-Za-z0-9_-]{1,15}$/.test(username)) {
      setUsernameError(
        "Please enter only letters, numbers, '_', or '-' with a maximum of 15 characters"
      );
      isValid = false;
    } else {
      setUsernameError("");
    }

    // When arriving at the Edit Profile, fill in the data already known
    if (isValid && user) {
      const userRef = doc(db, "users", user.uid);
      updateUserData(userRef, {
        firstname: firstName,
        lastname: lastName,
        mail: email,
        username: username,
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
      <div className="darkMode">
        <ToggleButton
          id="dark-mode"
          onLabel="Dark Mode"
          offLabel="Light Mode"
          checked={darkModeChecked}
          onChange={(event) => setdarkModeChecked(event.value)}
        />
      </div>
      <form className="edit-profile-container">
        <label>Profile Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <label>First Name</label>
        <input
          type="text"
          required
          pattern="[A-Za-z]{1,30}"
          title="Please enter only letters with a maximum of 30 characters"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Last Name</label>
        <input
          type="text"
          required
          pattern="[A-Za-z]{1,30}"
          title="Please enter only letters with a maximum of 30 characters"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Username</label>
        <input
          type="text"
          required
          pattern="[A-Za-z0-9_-]{1,15}"
          title="Please enter only letters, numbers, '_', or '-' with a maximum of 15 characters"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div style={{ color: "red", fontSize: "12px" }}>
          {firstNameError && <span>{firstNameError}</span>}
        </div>
        <div style={{ color: "red", fontSize: "12px" }}>
          {lastNameError && <span>{lastNameError}</span>}
        </div>
        <div style={{ color: "red", fontSize: "12px" }}>
          {emailError && <span>{emailError}</span>}
        </div>
        <div style={{ color: "red", fontSize: "12px" }}>
          {usernameError && <span>{usernameError}</span>}
        </div>
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
