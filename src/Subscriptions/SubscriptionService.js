import React, { useState, useEffect } from "react";
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
import { auth } from "../Database/firebase";
import { useNavigate } from "react-router-dom";

const db = getFirestore();

const SubscriptionService = () => {
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
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [subscribedUntil, setSubscribedUntil] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
                subscribedOn: subscribedUntil,
                validUntil,
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
              setSubscribedUntil(data.subscribedOn);
              setValidUntil(data.validUntil);
            }
            setIsLoading(false); // Data loading is complete
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
            setIsLoading(false); // Data loading is complete
          });
      } else {
        setUser(null);
        navigate("/");
        setIsLoading(false); // Data loading is complete
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    // Check if the subscription has ended when validUntil changes
    if (validUntil) {
      const currentDate = new Date();
      const validUntilDate = new Date(validUntil);

      if (currentDate < validUntilDate) {
        setIsUserPremium(false);
      }
    }
  }, [validUntil]);

  const handleCheckout = async () => {
    try {
    } catch (error) {
      console.error("Error initiating checkout:", error);
      setIsUserPremium(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        style={{ marginTop: "5%", background: "#6366F1" }}
      >
        Checkout
      </button>
      <p>Subscribed on: {subscribedUntil}</p>
      <p>Subscription valid until: {validUntil}</p>
    </div>
  );
};

export default SubscriptionService;
