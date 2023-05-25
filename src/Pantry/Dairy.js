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
    productCard: {
      width: "250px",
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "4px",
    },
  };

  return (
    <div className="dashboard-dairy">
      <Navigation />
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

      <div className="product-list" style={styles.productList}>
        {fetchedProducts.map((product, index) => (
          <div key={index} className="product-card" style={styles.productCard}>
            <h3>{product.name}</h3>
            <p>Expiry Date: {product.expiryDate}</p>
            <p>Amount: {product.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dairy;
