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
import { auth } from "../Database/firebase";
import "../CSS/shopping-list.css";

const db = getFirestore();

export default function ShoppingList() {
  const [statedItem, setItem] = useState([]);
  const [user, setUser] = useState(null);

  function addItem() {
    let inputValue = document.querySelector(".inputElement").value;
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

  function deleteItem(index) {
    const updatedItemState = [...statedItem];
    updatedItemState.splice(index, 1);
    setItem(updatedItemState);

    // Update Firestore document after deleting an item
    if (user) {
      const userRef = doc(db, "users", user.uid);
      updateDoc(userRef, {
        [`shoppingListItems.${index}`]: null,
      })
        .then(() => {
          console.log("Item deleted from Firestore.");
        })
        .catch((error) => {
          console.error("Error updating Firestore:", error);
        });
    }
  }

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
