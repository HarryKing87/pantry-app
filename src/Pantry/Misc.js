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
/* React Toastify Notifications Imports */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* Calendar Import */
import { Calendar } from "primereact/calendar";
/* Dropdown Import */
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faCircleQuestion,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

const db = getFirestore();

const Misc = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [misc, setMisc] = useState([]);
  const [productName, setProductName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [amount, setAmount] = useState("");
  const [fetchedProducts, setFetchedProducts] = useState([]);
  library.add(faCoffee, faCircleQuestion);

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
                foods: [],
                fruits: [],
                meat: [],
                vegetables: [],
                pasta: [],
                misc: [],
              }); // Create initial document with empty foods array
            } else {
              const data = querySnapshot.docs[0].data();
              setMisc(data.misc || []);
              setFetchedProducts(data.misc || []); // Set fetched products in state
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

  const saveMiscProduct = async () => {
    const newMiscProduct = {
      name: productName,
      expiryDate: expiryDate.toLocaleDateString("en-GB"),
      amount: amount,
    };

    // Checking if the product currently being inserted already exists in the storage.
    if (
      fetchedProducts.some((product) => product.name === newMiscProduct.name)
    ) {
      alert("The product you selected already exists in your storage.");
    } else {
      const userRef = doc(db, "users", user.uid);
      const updatedMisc = [...misc, newMiscProduct]; // Create a new array with the added product

      try {
        await updateDoc(userRef, { misc: updatedMisc });

        // Update the state of the products list directly
        setMisc(updatedMisc);
        setFetchedProducts(updatedMisc);

        // Reset the dropdown inputs
        setProductName("");
        setExpiryDate("");
        setAmount("");

        fetchedProducts.map((product, index) => {
          if (
            fetchedProducts.some(
              (product) => product.name === newMiscProduct.name
            )
          ) {
            alert("The product you selected already exists in your storage.");
          }
        });
      } catch (error) {
        console.error("Error saving misc product:", error);
        alert("Error saving misc product:", error);
      }
    }
  };

  const deleteProduct = (productToBeDeleted) => {
    // Filtering the foods already available in the user foods list and excluding that specific
    // product willing to be deleted.
    const updatedMisc = misc.filter(
      (product) => product.name !== productToBeDeleted
    );
    const userRef = doc(db, "users", user.uid);

    updateDoc(userRef, { misc: updatedMisc })
      .then(() => {
        console.log("Misc product deleted successfully!");
        toast.success("Product deleted successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });

        // Update the state of the products list directly
        setMisc(updatedMisc);
        setFetchedProducts(updatedMisc);
      })
      .catch((error) => {
        console.error("Error deleting misc product:", error);
        alert("Error deleting misc product:", error);
      });
  };

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

  // Check today's date in order to alert the user.
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;

  const showToastMessage = (product) => {
    toast.warning(product + " has expired!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  function showDeletionInfo() {
    toast.info("You can click on the product card to delete your product.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  function showMiscSectionInfo() {
    toast.info("In this section, you can easily add your own custom products", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  return (
    <div className="dashboard-dairy">
      <script
        src="https://kit.fontawesome.com/53fcd94602.js"
        crossorigin="anonymous"
      ></script>
      <Navigation />
      <div className="misc-title">
        <h3 style={{ margin: "2rem auto" }}>Misc section.</h3>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          id="icon-misc"
          style={{
            position: "absolute",
            width: "85%",
            float: "right",
            right: "0",
            color: "#1E3050",
            fontSize: "20px",
          }}
          className="info-icon-component"
          onClick={showMiscSectionInfo}
        />
      </div>
      <form className="dairy-form">
        <InputText
          value={productName}
          onChange={handleProductNameChange}
          placeholder="Select Custom Product"
          className="form-input"
        />
        <Calendar
          placeholder="Expiry Date"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          dateFormat="dd/mm/yy"
          className="calendar"
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
          onClick={saveMiscProduct}
          className="submit-button"
        >
          Submit
        </button>
      </form>

      <div className="dashboard-dairy"></div>

      <div className="product-list" style={styles.productList}>
        {fetchedProducts.map((product, index) => {
          const isExpired = product.expiryDate < formattedDate;
          //const expiredProductName = isExpired ? product.name : null;

          return (
            <div
              key={index}
              className="product-card"
              style={styles.productCard}
            >
              <div className="info-icon">
                <div id="utility-box">
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    style={{
                      float: "right",
                      color: "#1E3050",
                      fontSize: "20px",
                    }}
                    className="info-icon-component"
                    onClick={showDeletionInfo}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{
                      float: "right",
                      color: "#1E3050",
                      fontSize: "20px",
                    }}
                    className="deletion-icon-component"
                    onClick={() =>
                      window.confirm("Would you like to delete this product?")
                        ? deleteProduct(product.name)
                        : ""
                    } // Running the code once on event handler level and not on initial rendering
                  />
                </div>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                {/* Same as */}
                <ToastContainer />
              </div>
              <ToastContainer />
              <div className="product-details" style={styles.productDetails}>
                <div className="product-info" style={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p className="expiry-date" style={styles.expiryDate}>
                    Expiry Date:{" "}
                    {isExpired ? (
                      <>
                        {/*showExpirationNotification(product.name)*/}
                        {showToastMessage(product.name)}
                        {product.expiryDate}
                      </>
                    ) : (
                      product.expiryDate
                    )}
                  </p>
                  <p className="amount" style={styles.amount}>
                    Amount: {product.amount}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Misc;
