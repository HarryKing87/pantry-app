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

const Fruits = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fruits, setFruits] = useState([]);
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
              setDoc(userRef, { id: user.uid, foods: [], fruits: [] }); // Create initial document with empty foods array
            } else {
              const data = querySnapshot.docs[0].data();
              setFruits(data.fruits || []);
              setFetchedProducts(data.fruits || []); // Set fetched products in state
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

  const saveFruitProduct = async () => {
    const newFruitProduct = {
      name: productName,
      expiryDate: expiryDate.toLocaleDateString("en-GB"),
      amount: amount,
    };

    // Checking if the product currently being inserted already exists in the storage.
    if (
      fetchedProducts.some((product) => product.name === newFruitProduct.name)
    ) {
      alert("The product you selected already exists in your storage.");
    } else {
      const userRef = doc(db, "users", user.uid);
      const updatedFruits = [...fruits, newFruitProduct]; // Create a new array with the added product

      try {
        await updateDoc(userRef, { fruits: updatedFruits });

        // Update the state of the products list directly
        setFruits(updatedFruits);
        setFetchedProducts(updatedFruits);

        // Reset the dropdown inputs
        setProductName("");
        setExpiryDate("");
        setAmount("");

        fetchedProducts.map((product, index) => {
          if (
            fetchedProducts.some(
              (product) => product.name === newFruitProduct.name
            )
          ) {
            alert("The product you selected already exists in your storage.");
          }
        });
      } catch (error) {
        console.error("Error saving fruit product:", error);
        alert("Error saving fruit product:", error);
      }
    }
  };

  const deleteProduct = (productToBeDeleted) => {
    // Filtering the foods already available in the user foods list and excluding that specific
    // product willing to be deleted.
    const updatedFruits = fruits.filter(
      (product) => product.name !== productToBeDeleted
    );
    const userRef = doc(db, "users", user.uid);

    updateDoc(userRef, { fruits: updatedFruits })
      .then(() => {
        console.log("Dairy product deleted successfully!");
        toast.success("Product deleted successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });

        // Update the state of the products list directly
        setFruits(updatedFruits);
        setFetchedProducts(updatedFruits);
      })
      .catch((error) => {
        console.error("Error deleting fruit product:", error);
        alert("Error deleting fruit product:", error);
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

  const productOptions = [
    { label: "Select Fruit Product", value: "", image: "" },
    { label: "Apricot", value: "Apricot", image: "./Fruit-Images/apricot.jpg" },
    { label: "Apple", value: "Apple", image: "./Fruit-Images/apple.jpg" },
    { label: "Avocado", value: "Avocado", image: "./Fruit-Images/avocado.jpg" },
    { label: "Banana", value: "Banana", image: "./Fruit-Images/banana.jpg" },
    {
      label: "Blackberry",
      value: "Blackberry",
      image: "./Fruit-Images/blackberry.jpg",
    },
    {
      label: "Blueberry",
      value: "Blueberry",
      image: "./Fruit-Images/blueberry.jpg",
    },
    {
      label: "Cactus Fruit",
      value: "Cactus Fruit",
      image: "./Fruit-Images/cactus-fruit.jpg",
    },
    {
      label: "Cantaloupe",
      value: "Cantaloupe",
      image: "./Fruit-Images/cantaloupe.jpg",
    },
    { label: "Cherry", value: "Cherry", image: "./Fruit-Images/cherry.jpg" },
    {
      label: "Clementine",
      value: "Clementine",
      image: "./Fruit-Images/clementine.jpg",
    },
    { label: "Coconut", value: "Coconut", image: "./Fruit-Images/coconut.jpg" },
    {
      label: "Cranberry",
      value: "Cranberry",
      image: "./Fruit-Images/cranberry.jpg",
    },
    {
      label: "Dragon Fruit",
      value: "Dragon Fruit",
      image: "./Fruit-Images/dragon-fruit.jpg",
    },
    { label: "Fig", value: "Fig", image: "./Fruit-Images/fig.jpg" },
    {
      label: "Grapefruit",
      value: "Grapefruit",
      image: "./Fruit-Images/grapefruit.jpg",
    },
    { label: "Grapes", value: "Grapes", image: "./Fruit-Images/grapes.jpg" },
    { label: "Guava", value: "Guava", image: "./Fruit-Images/guava.jpg" },
    {
      label: "Jackfruit",
      value: "Jackfruit",
      image: "./Fruit-Images/jackfruit.jpg",
    },
    { label: "Kiwi", value: "Kiwi", image: "./Fruit-Images/kiwi.jpg" },
    { label: "Lemon", value: "Lemon", image: "./Fruit-Images/lemon.jpg" },
    { label: "Lime", value: "Lime", image: "./Fruit-Images/lime.jpg" },
    { label: "Lychee", value: "Lychee", image: "./Fruit-Images/lychee.jpg" },
    { label: "Mango", value: "Mango", image: "./Fruit-Images/mango.jpg" },
    {
      label: "Mangosteen",
      value: "Mangosteen",
      image: "./Fruit-Images/mangosteen.jpg",
    },
    {
      label: "Mulberry",
      value: "Mulberry",
      image: "./Fruit-Images/mulberry.jpg",
    },
    {
      label: "Nectarine",
      value: "Nectarine",
      image: "./Fruit-Images/nectarine.jpg",
    },
    { label: "Orange", value: "Orange", image: "./Fruit-Images/orange.jpg" },
    { label: "Papaya", value: "Papaya", image: "./Fruit-Images/papaya.jpg" },
    {
      label: "Passion Fruit",
      value: "Passion Fruit",
      image: "./Fruit-Images/passion-fruit.jpg",
    },
    { label: "Peach", value: "Peach", image: "./Fruit-Images/peach.jpg" },
    { label: "Pear", value: "Pear", image: "./Fruit-Images/pear.jpg" },
    {
      label: "Persimmon",
      value: "Persimmon",
      image: "./Fruit-Images/persimmon.jpg",
    },
    {
      label: "Pineapple",
      value: "Pineapple",
      image: "./Fruit-Images/pineapple.jpg",
    },
    { label: "Plum", value: "Plum", image: "./Fruit-Images/plum.jpg" },
    {
      label: "Pomegranate",
      value: "Pomegranate",
      image: "./Fruit-Images/pomegranate.jpg",
    },
    { label: "Quince", value: "Quince", image: "./Fruit-Images/quince.jpg" },
    {
      label: "Rambutan",
      value: "Rambutan",
      image: "./Fruit-Images/rambutan.jpg",
    },
    {
      label: "Raspberry",
      value: "Raspberry",
      image: "./Fruit-Images/raspberry.jpg",
    },
    { label: "Soursop", value: "Soursop", image: "./Fruit-Images/soursop.jpg" },
    {
      label: "Star Fruit",
      value: "Star Fruit",
      image: "./Fruit-Images/star-fruit.jpg",
    },
    {
      label: "Strawberry",
      value: "Strawberry",
      image: "./Fruit-Images/strawberry.jpg",
    },
    {
      label: "Tangerine",
      value: "Tangerine",
      image: "./Fruit-Images/tangerine.jpg",
    },
    {
      label: "Watermelon",
      value: "Watermelon",
      image: "./Fruit-Images/watermelon.jpg",
    },
  ];

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
      <h3>Fruits section.</h3>
      <form className="dairy-form">
        <Dropdown
          value={productName}
          options={productOptions}
          onChange={handleProductNameChange}
          placeholder="Select Dairy Product"
          className="form-input dropdown-foods"
          showClear
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
          onClick={saveFruitProduct}
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

export default Fruits;
