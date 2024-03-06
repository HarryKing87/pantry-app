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
  const [validUntil, setValidUntil] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Fetch subscription status and update the state
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
              isUserPremium ? setIsUserPremium(true) : setIsUserPremium(false);
              setSubscribedUntil(data.subscribedOn);
              setValidUntil(data.validUntil);
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

  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth());
  const oneMonthLater = new Date();
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
  const currentMonthOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const currentMonthYear = currentDate.toLocaleString(
    "en-US",
    currentMonthOptions
  );

  const oneMonthLaterFormatted = oneMonthLater.toLocaleString(
    "en-US",
    currentMonthOptions
  );

  const subscriptionValid = oneMonthLaterFormatted;

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

      const { sessionId, status } = await response.json();
      alert("status is: " + status);

      setSubscribedUntil(currentMonthYear);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        subscribedOn: "",
        validUntil: "",
      });

      window.location.href = `https://checkout.stripe.com/c/pay/${sessionId}#fidkdWxOYHwnPyd1blpxYHZxWjA0TG4zSDRBQnVyd0dnfWZoSTN1fTx8ZzZ9fF1WVndiPTdOQ0tPNmtWM3NVf38za1NiTkA3YlJqN2ZRSGszVEpCfXRWbkN0dEldNWRqUl1BV3F8QTZ0S2d3NTUyUGJqN200aicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl`;
    } catch (error) {
      console.error("Error initiating checkout:", error);
      setIsUserPremium(false);
    }
  };

  const handleCancelSubscription = async () => {
    // Update the state to reflect the cancellation
    setIsUserPremium(false);
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      isUserPremium: false,
      subscribedOn: "",
      validUntil: "",
    });
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        style={{ marginTop: "5%", background: "#4caf50" }}
      >
        Checkout
      </button>
      <p>Subscribed on: {subscribedUntil}</p>
      <p>Subscription valid until: {validUntil}</p>
      <button
        onClick={handleCancelSubscription}
        style={{ background: "#FF6B6B" }}
      >
        Cancel Subscription
      </button>
    </div>
  );
};

export default SubscriptionService;
