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

const db = getFirestore();

// TEST MODE
const stripe = require("stripe")(
  "sk_test_51Ik6M1DGpwrBbxcmOs6t6tHPgHAzKSjowSDY0ZWfrIIW4zzMPkqLwJ0eT7Dn7Ym0bSmakJP63j91IaErsc2ntNsg00FmjGvBEK"
);

const DBConnection = () => {
  const [user, setUser] = useState(null);
  const [isUserPremium, setIsUserPremium] = useState(false);

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
                isUserPremium
              });
            } else {
              const data = querySnapshot.docs[0].data();
              setIsUserPremium(data.isUserPremium || false);
            }
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
          });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createCheckoutSession = async () => {
    try {
      const session = await stripe.checkout.sessions.create({
        success_url: "https://itspantry.netlify.app",
        cancel_url: "https://itspantry.netlify.app/profile",
        payment_method_types: ["card"],
        line_items: [
          {
            price: "price_1NjS6vDGpwrBbxcmyjQepCM7",
            quantity: 1,
          },
        ],
        mode: "subscription",
      });
  
      // If the session creation is successful, set the user as premium
      if (session) {
        const userId = user ? user.uid : null;
        const userRef = doc(db, "users", userId);
  
        await updateDoc(userRef, {
          isUserPremium: true,
        });
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: session.id }),
      };
    } catch (error) {
      console.error("Error creating session:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "An error occurred" }),
      };
    }
  };
}
/* TESTING FLOW
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Ik6M1DGpwrBbxcmOs6t6tHPgHAzKSjowSDY0ZWfrIIW4zzMPkqLwJ0eT7Dn7Ym0bSmakJP63j91IaErsc2ntNsg00FmjGvBEK"
);

app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/profile",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1NjS6vDGpwrBbxcmyjQepCM7",
          quantity: 1,
        },
      ],
      mode: "subscription",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
*/
export default DBConnection;