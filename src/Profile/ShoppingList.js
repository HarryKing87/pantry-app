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
/* React Toastify Notifications Imports */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../Database/firebase";
import "../CSS/shopping-list.css";

const db = getFirestore();

export default function ShoppingList() {
  const [statedItem, setItem] = useState([]);
  const [user, setUser] = useState(null);

  const showToastMessage = () => {
    toast.error("Please put a value inside you shopping list!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  function addItem() {
    let inputValue = document.querySelector(".inputElement").value.trim();
    if (inputValue === "") {
      showToastMessage();
    } else {
      const updatedItems = [...statedItem, inputValue];
      setItem(updatedItems);
      document.querySelector(".inputElement").value = ""; // Emptying the input element after adding the item

      // Update Firestore document with the new item
      if (user) {
        const userRef = doc(db, "users", user.uid);
        updateDoc(userRef, {
          [`shoppingListItems.${updatedItems.length - 1}`]: inputValue,
        })
          .then(() => {
            console.log("Item added to Firestore.");
          })
          .catch((error) => {
            console.error("Error updating Firestore:", error);
          });
      }
    }
  }

  const deleteItem = (index) => {
    // Create a copy of the shopping list items array with the item at the specified index removed
    const updatedItems = [
      ...statedItem.slice(0, index),
      ...statedItem.slice(index + 1),
    ];

    // Update Firestore document to remove the item from shoppingListItems
    if (user) {
      const userRef = doc(db, "users", user.uid);

      // Create an update object to remove the item from Firestore
      const updateObj = {
        shoppingListItems: updatedItems.reduce((acc, item, idx) => {
          acc[idx] = item;
          return acc;
        }, {}),
      };

      updateDoc(userRef, updateObj)
        .then(() => {
          console.log("Item deleted from Firestore.");

          // Update the state of the shopping list items directly
          setItem(updatedItems);
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          alert("Error deleting item:", error);
        });
    }
  };

  // Save the shopping list items in Firebase Firestore whenever statedItem changes.
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
                shoppingListItems: {},
              }); // Create initial document with an empty shoppingListItems object
            } else {
              const data = querySnapshot.docs[0].data();
              setItem(Object.values(data.shoppingListItems || {}));
            }
          })
          .catch((error) => {
            console.error("Error getting user data:", error);
            alert("Error getting user data:", error);
          });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [statedItem]);

  return (
    <div>
      <div className="shopping-list-toolbar">
        <input type="text" className="inputElement" placeholder="New item..." />
        <button className="buttonSubmit" onClick={addItem}>
          Add
        </button>
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
      <div className="list-container">
        <ul className="unordered-list-cont">
          {statedItem.map((items, index) => (
            <li key={index} className="list-item">
              {items}
              <button
                onClick={() => deleteItem(index)}
                className="buttonDelete"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
