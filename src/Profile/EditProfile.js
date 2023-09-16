import React, { useState, useEffect } from "react";
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

const db = getFirestore();

function EditProfile() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
              });
              setFirstName(data.firstname);
              setLastName(data.lastname);
              setEmail(data.mail);
              setUsername(data.username);
              toast.success("Profile updated successfully!", {
                position: toast.POSITION.TOP_RIGHT,
              });
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

      // If imageUrl exists in dataToUpdate, update it separately
      if (dataToUpdate.userImage) {
        await updateDoc(userRef, { userImage: dataToUpdate.userImage });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleProfileSave = () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      updateUserData(userRef, {
        firstname: firstName,
        lastname: lastName,
        mail: email,
        username: username,
        userImage: imageUrl,
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

  return (
    <div>
      <form className="edit-profile-container">
        <label>Profile Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <label>First Name</label>
        <input
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Last Name</label>
        <input
          type="text"
          required
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
      <button
        type="button"
        style={{ background: "#6366F1" }}
        onClick={handleProfileSave}
      >
        Save
      </button>
    </div>
  );
}

export default EditProfile;
