import Navigation from "../Navigation";
import { useState, useEffect } from "react";
import ImageScrollerPremium from "./Dashboard-Premium";
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

  return (
    <>
      <Navigation />

      {isUserPremium ? <ImageScrollerPremium /> : <h1>You are not a premium user</h1>}
    </>
  );
};

export default ImageScroller;
