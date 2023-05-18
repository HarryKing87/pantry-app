import React from "react";
import Navigation from "../Navigation";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Database/firebase";
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
import "../CSS/products.css";
const db = getFirestore();

const Dairy = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [foods, setFoods] = useState([]);
  const [productName, setProductName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [amount, setAmount] = useState("");
  const [dairyProducts, setDairyProducts] = useState([]);
  const [fetchedProducts, setFetchedProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        getDocs(q)
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              setDoc(userRef, { id: user.uid, foods: [] }); // Create initial document with empty foods array
            } else {
              const data = querySnapshot.docs[0].data();
              setFoods(data.foods || []);
              setFetchedProducts(data.foods || []); // Set fetched products in state
            }
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
            alert("Error getting user data:", error);
          });
      } else {
        setUser(null);
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const saveDairyProduct = () => {
    const newDairyProduct = {
      name: productName,
      expiryDate: expiryDate,
      amount: amount,
    };

    const userRef = doc(db, "users", user.uid);
    updateDoc(userRef, {
      foods: [...foods, newDairyProduct], // Add new product to existing foods array
    })
      .then(() => {
        setProductName("");
        setExpiryDate("");
        setAmount("");
        console.log("Dairy product saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving dairy product:", error);
        alert("Error saving dairy product:", error);
      });
  };

  return (
    <div className="dashboard-dairy">
      <h3>Dairy section.</h3>
      <form className="dairy-form">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={handleProductNameChange}
          className="form-input"
        />
        <input
          type="date"
          placeholder="Expiry Date"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
          className="form-input"
        />
        <button
          type="button"
          onClick={saveDairyProduct}
          className="submit-button"
        >
          Submit
        </button>
      </form>
      <div className="dashboard-dairy"></div>

      <div className="product-list">
        <h4>Saved Dairy Products:</h4>
        {fetchedProducts.length === 0 ? (
          <p>No dairy products found.</p>
        ) : (
          <ul className="product-list-items">
            {fetchedProducts.map((product, index) => (
              <li key={index} className="product-item">
                <span>{product.name}</span>
                <span>{product.expiryDate}</span>
                <span>{product.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dairy;
