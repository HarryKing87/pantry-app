import React, { useState, useEffect, useRef } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { AutoComplete } from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
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
// All countries and cities
import citiesData from "./countries.json";
import { auth } from "../Database/firebase";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
/* React Toastify Notifications Imports */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "../CSS/dark-mode.css";
import "../CSS/EditProfile.css";

const db = getFirestore();

function EditProfile() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  // Validation states
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [darkModeChecked, setdarkModeChecked] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [joined, setJoined] = useState("");
  const navigate = useNavigate();
  var date = new Date();

  // Confirmation change password/email flow
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const toast = useRef(null);

  const acceptEmail = () => {
    handleEmailChange(newEmail);
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: `Email changed to ${newEmail}`,
      life: 3000,
    });
    setEmailVisible(false);
  };

  const rejectEmail = () => {
    setEmailVisible(false);
  };

  const acceptPassword = () => {
    handlePasswordChange(newPassword);
    setPasswordVisible(false);
  };

  const rejectPassword = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
    setPasswordVisible(false);
  };

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
                userDescription: userDescription,
                selectedCity: selectedCity,
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
                userDescription: userDescription || data.userDescription,
                selectedCity: selectedCity || data.selectedCity,
                isDarkModeEnabled: darkModeChecked || data.isDarkModeEnabled,
                joined: data.joined ? data.joined : date.getFullYear(),
              });
              setFirstName(data.firstname);
              setLastName(data.lastname);
              setEmail(data.mail);
              setUsername(data.username);
              setUserDescription(data.userDescription);
              setSelectedCity(data.selectedCity);
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
        userDescription: userDescription,
        selectedCity: selectedCity,
        isDarkModeEnabled:
          darkModeChecked !== undefined ? darkModeChecked : false,
      });
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Your profile has been updated!",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    if (darkModeChecked) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkModeChecked]);

  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    // Flatten the cities data into the desired format
    const citiesList = [];

    Object.entries(citiesData).forEach(([country, cityArray]) => {
      cityArray.forEach((city) => {
        citiesList.push({ name: city, country: country });
      });
    });

    setCities(citiesList);
  }, []);

  const searchCity = (event) => {
    setFilteredCities(
      cities.filter((city) =>
        city.name.toLowerCase().startsWith(event.query.toLowerCase())
      )
    );
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.value);
    console.log("Selected city:", e.value);
  };

  const handleEmailChange = (emailToChangeTo) => {
    const auth = getAuth();
    const userRef = doc(db, "users", user.uid);
    updateEmail(auth.currentUser, emailToChangeTo)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Your e-mail has been saved!",
          life: 3000,
        });
        setEmail(emailToChangeTo);
        // The email is changing after the updateEmail function, but the visualization remains the same
        // and shows the old email. We are updating again the user data to show the correct value.
        updateUserData(userRef, {
          mail: emailToChangeTo,
        });
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Your e-mail could not be saved! Reason: " + error,
          life: 3000,
        });
      });
  };

  const handlePasswordChange = (passwordToChangeTo) => {
    const auth = getAuth();
    updatePassword(auth.currentUser, passwordToChangeTo)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Your password has been saved!",
          life: 3000,
        });
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Your password could not be saved! Reason: " + error,
          life: 3000,
        });
      });
  };

  // Template to display city with country in the suggestions
  const itemTemplate = (city) => {
    return (
      <div>
        {city.name}, {city.country}
      </div>
    );
  };

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

        <label>Description</label>
        <textarea
          type="text"
          pattern="[A-Za-z0-9_-]{1,}"
          title="Please enter only letters, numbers, '_', or '-' with a maximum of 15 characters"
          value={userDescription}
          onChange={(e) => setUserDescription(e.target.value)}
          style={{ resize: "vertical", width: "345px" }}
        />

        <label>Location</label>
        <AutoComplete
          value={selectedCity}
          suggestions={filteredCities}
          completeMethod={searchCity}
          field="name"
          onChange={handleCityChange}
          placeholder="Type to search for a city"
          itemTemplate={itemTemplate}
          style={{ width: "100%" }}
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

      <label>Change E-mail</label>
      <div className="credentials-change">
        <InputText
          type="text"
          className="p-inputtext-sm"
          placeholder="Type new e-mail"
          onBlur={(e) => setNewEmail(e.target.value)}
        />
        <Toast ref={toast} />
        <ConfirmDialog
          className="credentialsChange-dialog"
          group="declarative"
          visible={emailVisible}
          onHide={() => setEmailVisible(false)}
          message={`Are you sure you want to change your email to ${newEmail}?`}
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={acceptEmail}
          reject={rejectEmail}
        />
        <Button
          onClick={() => setEmailVisible(true)}
          icon="pi pi-check"
          label="Confirm"
          className="confirmationButton"
          style={{ background: "#4caf50" }}
        />
      </div>

      <label>Change Password</label>
      <div className="credentials-change">
        <InputText
          type="text"
          className="p-inputtext-sm"
          placeholder="Type new password"
          onBlur={(e) => setNewPassword(e.target.value)}
        />
        <Toast ref={toast} />
        <ConfirmDialog
          className="credentialsChange-dialog"
          group="declarative"
          visible={passwordVisible}
          onHide={() => setPasswordVisible(false)}
          message={`Are you sure you would like to change your password?`}
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={acceptPassword}
          reject={rejectPassword}
        />
        <Button
          onClick={() => setPasswordVisible(true)}
          icon="pi pi-check"
          label="Confirm"
          className="confirmationButton"
          style={{ background: "#4caf50" }}
        />
      </div>
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
