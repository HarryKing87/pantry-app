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
/*Meat Images JSON import */
import productOptions from "../Database/MeatImages.json";
// Importing Packaging types
import packaging from "../Database/PackagingTypes.json";
/* Dropdown Import */
import { Dropdown } from "primereact/dropdown";
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

const Meat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [meat, setMeat] = useState([]);
  const [productName, setProductName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [amount, setAmount] = useState("");
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [darkModeChecked, setdarkModeChecked] = useState(false);
  library.add(faCoffee, faCircleQuestion);
  const [packageType, setPackageType] = useState([]);

  useEffect(() => {
    // Set the containers state with the data from the imported JSON file
    setPackageType(packaging.value);
  }, []);

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
              }); // Create initial document with empty foods array
            } else {
              const data = querySnapshot.docs[0].data();
              setMeat(data.meat || []);
              setFetchedProducts(data.meat || []); // Set fetched products in state
              setdarkModeChecked(data.isDarkModeEnabled);
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

  useEffect(() => {
    if (darkModeChecked && darkModeChecked !== null) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkModeChecked]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePackagingTypeChange = (e) => {
    setPackageType(e.target.value);
  }

  const saveMeatProduct = async () => {
    const newMeatProduct = {
      name: productName,
      expiryDate: expiryDate.toLocaleDateString("en-GB"),
      amount: amount,
      packagingType: packageType
    };

    // Checking if the product currently being inserted already exists in the storage.
    if (
      fetchedProducts.some((product) => product.name === newMeatProduct.name)
    ) {
      toast.error("The product you selected already exists in your storage.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const userRef = doc(db, "users", user.uid);
      const updatedMeat = [...meat, newMeatProduct]; // Create a new array with the added product

      try {
        await updateDoc(userRef, { meat: updatedMeat });

        // Update the state of the products list directly
        setMeat(updatedMeat);
        setFetchedProducts(updatedMeat);

        // Reset the dropdown inputs
        setProductName("");
        setExpiryDate("");
        setAmount("");
        setPackageType("");

        fetchedProducts.map((product, index) => {
          if (
            fetchedProducts.some(
              (product) => product.name === newMeatProduct.name
            )
          ) {
            alert("The product you selected already exists in your storage.");
          }
        });
      } catch (error) {
        console.error("Error saving meat product:", error);
        alert("Error saving meat product:", error);
      }
    }
  };

  const deleteProduct = (productToBeDeleted) => {
    // Filtering the foods already available in the user foods list and excluding that specific
    // product willing to be deleted.
    const updatedMeat = meat.filter(
      (product) => product.name !== productToBeDeleted
    );
    const userRef = doc(db, "users", user.uid);

    updateDoc(userRef, { meat: updatedMeat })
      .then(() => {
        console.log("Dairy product deleted successfully!");
        toast.success("Product deleted successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });

        // Update the state of the products list directly
        setMeat(updatedMeat);
        setFetchedProducts(updatedMeat);
      })
      .catch((error) => {
        console.error("Error deleting meat product:", error);
        alert("Error deleting meat product:", error);
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

  function showRelatedImage(product) {
    const itemMapped = productOptions
      .map((options) => options.value)
      .includes(product);

    if (itemMapped) {
      const productOption = productOptions.find(
        (option) => option.value === product
      );
      const imageURL = productOption.image;
      return imageURL;
    }
  }

  function showDeletionInfo() {
    toast.info("You can click on the product card to delete your product.", {
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
      <h3 style={{ margin: "2rem auto" }}>Meat section.</h3>
      <form className="dairy-form">
        <Dropdown
          value={productName}
          options={productOptions}
          onChange={handleProductNameChange}
          placeholder="Select Meat Product"
          className="form-input dropdown-foods"
          showClear
        />
        <Calendar
          placeholder="Expiry Date"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          dateFormat="dd/mm/yy"
          className="calendar form-input"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
          className="form-input amount"
          pattern="\d*"
        />
        <Dropdown
          value={packageType}
          options={packaging}
          onChange={handlePackagingTypeChange}
          placeholder="Select Packaging"
          className="form-input dropdown-foods"
          showClear
        />
        <button
          type="button"
          onClick={saveMeatProduct}
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
                <div className="product-icon" style={styles.productIcon}>
                  <img
                    src={showRelatedImage(product.name)}
                    alt="Food Icon"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
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
                    Amount: {product.amount} {product.packagingType}
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

export default Meat;
