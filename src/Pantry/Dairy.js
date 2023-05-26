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

    // Checking if the product currently being inserted, already exists in the storage.
    if (
      fetchedProducts.some((product) => product.name === newDairyProduct.name)
    ) {
      alert("The product you selected already exists in your storage.");
    } else {
      const userRef = doc(db, "users", user.uid);
      updateDoc(userRef, {
        foods: [...foods, newDairyProduct], // Add new product to existing foods array
      })
        .then(() => {
          fetchedProducts.map((product, index) => {
            if (
              fetchedProducts.some(
                (product) => product.name === newDairyProduct.name
              )
            ) {
              alert("The product you selected already exists in your storage.");
            }
          });
          window.location.reload(); // TODO: Change the state of the products list, instead of reloading the page.
        })
        .catch((error) => {
          console.error("Error saving dairy product:", error);
          alert("Error saving dairy product:", error);
        });
    }
  };

  const images = [
    "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFpcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
    "https://plus.unsplash.com/premium_photo-1664647903742-52e5f954c28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGFpcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1602153508753-4ace888c10a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGFpcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1609246280917-339404083c49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRhaXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRhaXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1596633605700-1efc9b49e277?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGRhaXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1620189507195-68309c04c4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGRhaXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1628815870980-f416105d89b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGRhaXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1552404200-b22566b2317b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGRhaXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1554522723-b2a47cb105e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGRhaXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
  ];

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  /*const deleteProduct = (productToBeDeleted) => {
    // Filtering the foods already available in the user foods list and excluding that specific
    // product willing to be deleted.
    const updatedFoods = foods.filter(
      (product) => product.name !== productToBeDeleted
    );
    const userRef = doc(db, "users", user.uid);
    updateDoc(userRef, { foods: updatedFoods })
      .then(() => {
        console.log("Dairy product deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting dairy product:", error);
        alert("Error deleting dairy product:", error);
      });
  };*/

  const styles = {
    title: {
      fontSize: "18px",
      marginBottom: "10px",
    },
    noProducts: {
      fontSize: "14px",
      color: "#999",
    },
    productListItems: {
      listStyleType: "none",
      padding: "0",
      margin: "0",
    },
    productItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    productName: {
      flex: "1",
      marginRight: "10px",
    },
    expiryDate: {
      flex: "1",
      marginRight: "10px",
    },
    amount: {
      flex: "1",
      marginRight: "10px",
    },
    productList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
    },
  };

  return (
    <div className="dashboard-dairy">
      <Navigation />
      <h3>Dairy section.</h3>
      <form className="dairy-form">
        <select
          value={productName}
          onChange={handleProductNameChange}
          className="form-input"
        >
          <option value="">Select Dairy Product</option>
          <option value="Milk">Milk</option>
          <option value="Cheese">Cheese</option>
          <option value="Yogurt">Yogurt</option>
          <option value="Butter">Butter</option>
          <option value="Feta">Feta Cheese</option>
          <option value="Cream">Cream</option>
          <option value="Ice Cream">Ice Cream</option>
        </select>
        <input
          type="date"
          placeholder="Expiry Date"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          className="form-input"
        />
        <input
          type="number"
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

      <div className="product-list" style={styles.productList}>
        {fetchedProducts.map((product, index) => (
          <div key={index} className="product-card" style={styles.productCard}>
            <div className="product-details" style={styles.productDetails}>
              <div className="product-icon" style={styles.productIcon}>
                <img
                  src={getRandomImage()}
                  alt="Food Icon"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="product-info" style={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className="expiry-date" style={styles.expiryDate}>
                  Expiry Date: {product.expiryDate}
                </p>
                <p className="amount" style={styles.amount}>
                  Amount: {product.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dairy;
