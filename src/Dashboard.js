import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard-Premium";
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
import { auth } from "./Database/firebase";
import { useNavigate } from "react-router-dom";
import "./CSS/dashboard.css";

const db = getFirestore();

const ImageScroller = ({
  image1 = "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJ1aXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  image2 = "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
  image3 = "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRhaXJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  image4 = "https://images.unsplash.com/photo-1603048297172-c92544798d5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1lYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  image5 = "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  image6 = "https://images.unsplash.com/photo-1586585571612-bbc4176c9bf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFudHJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
}) => {
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

      {isUserPremium ? <Dashboard /> : <h1>You are not a premium user</h1>}
    </>
  );
};

export default ImageScroller;
