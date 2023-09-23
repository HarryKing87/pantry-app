/*import React from "react";

const SubscriptionService = () => {
  const handleCheckout = async () => {
    try {
      const response = await fetch("/.netlify/functions/server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { sessionId } = await response.json();
      alert(sessionId);
      window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}#fidkdWxOYHwnPyd1blpxYHZxWjA0TG4zSDRBQnVyd0dnfWZoSTN1fTx8ZzZ9fF1WVndiPTdOQ0tPNmtWM3NVf38za1NiTkA3YlJqN2ZRSGszVEpCfXRWbkN0dEldNWRqUl1BV3F8QTZ0S2d3NTUyUGJqN200aicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl`;
    } catch (error) {
      console.error("Error initiating checkout:", error);
    }
  };

  return (
    <div>
      <h1>Stripe Checkout Example</h1>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default SubscriptionService;
*/
import React from "react";
import { useState, useEffect } from "react";
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
  const handleCheckout = async () => {
    try {
      const response = await fetch("/.netlify/functions/server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { sessionId } = await response.json();
      setIsUserPremium(true);
      let premiumUntil = new Date();
      premiumUntil.getMonth();
      setSubscribedUntil(premiumUntil);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        isUserPremium: true,
      });
      window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}#fidkdWxOYHwnPyd1blpxYHZxWjA0TG4zSDRBQnVyd0dnfWZoSTN1fTx8ZzZ9fF1WVndiPTdOQ0tPNmtWM3NVf38za1NiTkA3YlJqN2ZRSGszVEpCfXRWbkN0dEldNWRqUl1BV3F8QTZ0S2d3NTUyUGJqN200aicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl`;
    } catch (error) {
      console.error("Error initiating checkout:", error);
      setIsUserPremium(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        style={{ marginTop: "5%", background: "#6366F1" }}
      >
        Checkout
      </button>
    </div>
  );
};

export default SubscriptionService;
