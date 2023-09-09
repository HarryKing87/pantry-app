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
import { PrimeIcons } from "primereact/api";
import "primeicons/primeicons.css";

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
  const [profileMenuTab, setProfileMenuTab] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserPremium, setIsUserPremium] = useState("");

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

  // Menu tabs for profile
  const menuTabs = [
    {
      name: "Shopping List",
      component: <ShoppingList />,
    },
    {
      name: "Test 1",
      component: "No page found",
    },
    {
      name: "Test 2",
      component: "No page found",
    },
  ];

  function changeProfileTab(index) {
    if (menuTabs[index]) {
      setProfileMenuTab(null); // Clear the content first
      setTimeout(() => {
        setProfileMenuTab(menuTabs[index].component);
        document
          .querySelector(".shoppingList-container")
          .classList.remove("transition-fade-enter");
        document
          .querySelector(".shoppingList-container")
          .classList.add("transition-fade-enter-active");
      }, 1000); // A small delay to ensure the clearing effect takes place
    }
  }

  /* Edit Profile modal */
  function editProfile() {
    setIsModalOpen(true);
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
      <div className="Profile">
        <div style={{ float: "right", fontSize: "20px" }}>
          <FontAwesomeIcon icon={faGears} onClick={editProfile} />
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

      <div id="menu-profile-tab">
        {menuTabs.map((tab, index) => (
          <p
            key={index}
            id="menu-tab-item"
            onClick={() => {
              changeProfileTab(index);
            }}
          >
            {tab.name}
          </p>
        ))}
      </div>

      <div className="shoppingList-container transition-fade transition-fade-enter">
        {profileMenuTab}
      </div>

      <SubscriptionService />

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
