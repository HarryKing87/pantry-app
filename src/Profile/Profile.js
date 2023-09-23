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
import "../CSS/profile-modal.css";
/* Checkbox styling */
import { Checkbox } from "primereact/checkbox";
// Shopping List Component
import ShoppingList from "./ShoppingList";
// Icon set for profile pic
import { Avatar } from "primereact/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import EditProfile from "./EditProfile";
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
  const [profileMenuTab] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserPremium, setIsUserPremium] = useState("");
  // Prime React Component for slider menu
  const [visible, setVisible] = useState(false);
  const [shoppingListVisible, setShoppingListVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [subscribedUntil, setSubscribedUntil] = useState("");

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
                selectedImage,
                isUserPremium,
                subscribedUntil,
              });
            } else {
              const data = querySnapshot.docs[0].data();
              setAllergies(data.allergies);
              setFirstName(data.firstname);
              setLastName(data.lastname);
              setMail(data.mail);
              setUsername(data.username);
              setSelectedImage(data.userImage);
              setIsUserPremium(data.isUserPremium);
              setSubscribedUntil(data.subscribedUntil);
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

  return (
    <div className="navigation-container">
      <Navigation />
      <h3
        style={{ textAlign: "left", maxWidth: "50%", margin: "5% auto 0 auto" }}
      >
        Information.
      </h3>
      <div className="Profile">
        <div style={{ float: "right", fontSize: "20px" }}>
          <Sidebar
            visible={settingsVisible}
            onHide={() => setSettingsVisible(false)}
          >
            <EditProfile />
          </Sidebar>
          <FontAwesomeIcon
            icon={faGears}
            onClick={() => setSettingsVisible(true)}
          />
        </div>
        <div id="profile-img">
          <Avatar image={selectedImage} size="xlarge" shape="circle" />
          <div className="user-info">
            <p style={{ marginLeft: "7px", fontSize: "20px" }}>
              {firstname} {lastname} {isUserPremium ? verified : ""}
            </p>
            <i style={{ marginLeft: "7px", fontSize: "14px" }}>
              {username ? "@" + username : ""}
            </i>
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
            <button type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </form>
      </div>

      <h3 style={{ textAlign: "left", maxWidth: "50%", margin: "0 auto" }}>
        Utilities.
      </h3>
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
    </div>
  );
}

export default Profile;
