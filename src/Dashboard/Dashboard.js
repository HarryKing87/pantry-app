import { useState, useEffect } from "react";
import ImageScrollerPremium from "./Dashboard-Premium";
import DashboardLocked from "./Dashboard-Locked";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { auth } from "../Database/firebase";
import { useNavigate } from "react-router-dom";
import "../CSS/dashboard.css";
// Dark Mode Flow
import '../CSS/dark-mode.css';

const db = getFirestore();

const ImageScroller = () => {
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUserPremium, setIsUserPremium] = useState("");
  const [darkModeChecked, setdarkModeChecked] = useState(false);


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
                darkModeChecked,
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

  useEffect(() => {
    if (darkModeChecked && darkModeChecked !== null) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkModeChecked]);

  return (
    <>

      {isUserPremium ? <ImageScrollerPremium /> : <DashboardLocked />}
    </>
  );
};

export default ImageScroller;
