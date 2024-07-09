import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import Cookies from "js-cookie";
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
import "../CSS/profile-modal.css";
/* Checkbox styling */
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
// Shopping List Component
import ShoppingList from "./ShoppingList";
// Icon set for profile pic
import { Avatar } from "primereact/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faEllipsisVertical,
  faEarthEurope,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import EditProfile from "./EditProfile";
import ChangeImage from "./ChangeImage";
import ChangeCoverImage from "./ChangeCoverImage";
import SubscriptionService from "../Subscriptions/SubscriptionService";
// Prime icon for verified user
import "primeicons/primeicons.css";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

const db = getFirestore();

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allergies, setAllergies] = useState({
    peanuts: false,
    dairy: false,
    gluten: false,
  });
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [profileMenuTab] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserPremium, setIsUserPremium] = useState("");
  // Prime React Component for slider menu
  const [visible, setVisible] = useState(false);
  const [shoppingListVisible, setShoppingListVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [changeImageVisible, setChangeImageVisible] = useState(false);
  const [changeCoverVisible, setChangeCoverVisible] = useState(false);
  const [subscribedUntil, setSubscribedUntil] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [visibleNewUser, setVisibleNewUser] = useState();
  const [darkModeChecked, setdarkModeChecked] = useState(false);
  const [joined, setJoined] = useState("");
  const [storedFood, setStoredFood] = useState();
  const [consumedFood, setConsumedFood] = useState();
  const [wastedFood, setWastedFood] = useState();

  // Check if the subscription has ended and set setIsUserPremium to false if needed
  useEffect(() => {
    if (validUntil && isUserPremium) {
      const currentDate = new Date();
      const validUntilDate = new Date(validUntil);

      if (currentDate > validUntilDate) {
        // Subscription has ended, set setIsUserPremium to false
        setIsUserPremium(false);
      }

      if (!isUserPremium) {
        setIsUserPremium(false);
      }
    }
  }, [validUntil, isUserPremium]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        getDocs(q)
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              setDoc(userRef, {
                id: user.uid,
                allergies,
                firstname,
                lastname,
                mail,
                username,
                userDescription,
                selectedCity,
                selectedImage,
                isUserPremium,
                subscribedUntil,
                validUntil,
                darkModeChecked,
                backgroundImage,
                joined,
                storedFood,
                consumedFood,
                wastedFood,
              });
            } else {
              const data = querySnapshot.docs[0].data();
              setAllergies(data.allergies ? data.allergies : "");
              setFirstName(data.firstname);
              setLastName(data.lastname);
              setMail(data.mail);
              setUsername(data.username);
              setSelectedImage(data.userImage);
              setIsUserPremium(data.isUserPremium);
              setSubscribedUntil(data.subscribedOn);
              setValidUntil(data.validUntil);
              setdarkModeChecked(data.isDarkModeEnabled);
              setBackgroundImage(data.backgroundImage);
              setUserDescription(data.userDescription);
              setSelectedCity(data.selectedCity);
              setJoined(data.joined);
              setStoredFood(data.storedFood);
              setConsumedFood(data.consumedFood);
              setWastedFood(data.wastedFood);
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

  useEffect(() => {
    // Check if the cookie exists
    const bannerNewUserWelcome = Cookies.get("bannerNewUserWelcome");

    // If the cookie doesn't exist or its value is 'false', set it to 'true' and show the modal
    if (!bannerNewUserWelcome || bannerNewUserWelcome === "false") {
      // Set the cookie with an expiration date 365 days from now (you can adjust the expiry as needed)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 365); // Expires in 365 days

      Cookies.set("bannerNewUserWelcome", "true", { expires: expirationDate });
      setVisibleNewUser(true);
    }
  }, []);

  useEffect(() => {
    if (darkModeChecked && darkModeChecked !== null) {
      document.documentElement.classList.add("dark-mode");
      // Setting also the cookie for the dark mode
      const darkModeFlow = Cookies.get("isDarkModeEnabled");
      if (!darkModeFlow || darkModeFlow === "false") {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 365);
        Cookies.set("isDarkModeEnabled", "true", { expires: expirationDate });
      }
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkModeChecked]);

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

  if (!user) {
    return null;
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // Verified badge
  const verified = (
    <i
      className="pi pi-verified"
      style={{ fontSize: "1rem", color: "#6366F1" }}
      title="Premium User"
    ></i>
  );

  let locationArray = [selectedCity]; // Setting the location object received from the data base, as an array object.
  const isValidLocation =
    locationArray &&
    locationArray[0] &&
    locationArray[0].name !== "undefined" &&
    locationArray[0].country !== "undefined";
  return (
    <div className="navigation-container">
      <Navigation />
      <div className="Profile">
        <div
          className="profile-cover-image"
          style={{ "--background-image": `url(${backgroundImage})` }}
        >
          <button
            id="changeBackground-button"
            onClick={() => setChangeCoverVisible(true)}
          >
            Change background
          </button>
          <Avatar
            onClick={() => setChangeImageVisible(true)}
            image={selectedImage}
            size="xlarge"
            shape="circle"
            className="profile-picture"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <div style={{ float: "right", fontSize: "20px" }}>
          <Sidebar
            visible={settingsVisible}
            onHide={() => setSettingsVisible(false)}
            style={{ width: "29rem" }}
          >
            <EditProfile />
          </Sidebar>
          <span className="edit-profileButton">
            <FontAwesomeIcon
              className="settingsIcon"
              icon={faEllipsisVertical}
              onClick={() => setSettingsVisible(true)}
            />
            <button id="signOutButton" type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          </span>
        </div>
        <div id="profile-img">
          <div className="user-info">
            <div className="user-info-general">
              <p style={{ fontSize: "20px", textAlign: "left" }}>
                {firstname} {lastname} {isUserPremium ? verified : ""}
              </p>
              <p id="userDescription">{userDescription}</p>
              <div className="general-user-info">
                <span id="userName">
                  <p>{username ? "@" + username : ""}</p>
                </span>
                {isValidLocation && (
                  <span id="userLocation">
                    <FontAwesomeIcon
                      icon={faEarthEurope}
                      style={{ paddingRight: "4px", marginTop: "2%" }}
                    />
                    <p>
                      {locationArray[0].name + ", " + locationArray[0].country}
                    </p>
                  </span>
                )}

                <span id="userJoined">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    style={{ paddingRight: "4px", marginTop: "2%" }}
                  />
                  <p>Joined: {joined}</p>
                </span>
              </div>
            </div>
            <div id="storingInfo">
              <div id="storedFood">
                <span style={{ fontSize: "30px", fontWeight: "bolder" }}>
                  {storedFood}
                </span>
                <span style={{ fontSize: "11px" }}>Stored Food</span>
              </div>
              <div id="consumedFood">
                <span style={{ fontSize: "30px", fontWeight: "bolder" }}>
                  {consumedFood}
                </span>
                <span style={{ fontSize: "11px" }}>Consumed Food</span>
              </div>
              <div id="wastedFood">
                <span style={{ fontSize: "30px", fontWeight: "bolder" }}>
                  {wastedFood}
                </span>
                <span style={{ fontSize: "11px" }}>Wasted Food</span>
              </div>
            </div>
          </div>
        </div>
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
          </div>
        </form>
      </div>

      <div className="Profile">
        <div className="shoppingList">
          <h3>Shopping List</h3>
          <Sidebar
            visible={shoppingListVisible}
            onHide={() => setShoppingListVisible(false)}
          >
            <h2>Shopping List</h2>
            <ShoppingList />
          </Sidebar>
          <Button
            icon="pi pi-arrow-right"
            onClick={() => setShoppingListVisible(true)}
          />
        </div>
        <hr />
        <div className="manageSubscription">
          <h3>Manage Subscription</h3>
          <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <h2>Manage Subscription</h2>
            <SubscriptionService />
          </Sidebar>
          <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>
        <hr />
        <div className="changeImage">
          <Sidebar
            visible={changeImageVisible}
            onHide={() => setChangeImageVisible(false)}
          >
            <ChangeImage />
          </Sidebar>
        </div>
        <div className="changeCover">
          <Sidebar
            visible={changeCoverVisible}
            onHide={() => setChangeCoverVisible(false)}
          >
            <ChangeCoverImage />
          </Sidebar>
        </div>
      </div>

      <div className="shoppingList-container transition-fade transition-fade-enter">
        {profileMenuTab}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="modal-close" onClick={closeModal}>
              &times;
            </span>
            <h2>Edit Profile</h2>
            <div className="edit-profile">
              <EditProfile />
            </div>
          </div>
        </div>
      )}
      <Dialog
        header="The Pantry Team"
        visible={visibleNewUser}
        style={{ width: "90%" }}
        onHide={() => setVisibleNewUser(false)}
        className="welcome-message"
      >
        <h4>Welcome to Pantry!</h4>
        <p>
          We are delighted to welcome you aboard. 🎉 <br /> Your presence means
          a lot to us, and we're excited to have you as part of our community.
        </p>
        <p>
          To enhance your experience and make the most out of Pantry, we
          encourage you to complete your profile. Click on the gear icon located
          in the top-right corner to access your settings. There, you can fill
          in your profile details to personalize your journey with us.
        </p>
        <p>
          At Pantry, we're dedicated to providing you with a seamless and
          personalized experience. Explore our features, discover new
          possibilities, and don't hesitate to reach out if you have any
          questions or need assistance. Your satisfaction is our priority.
        </p>
        <p>
          Thank you for joining us on this exciting adventure. Let's create
          something amazing together! 🌟
        </p>
      </Dialog>
    </div>
  );
}

export default Profile;
