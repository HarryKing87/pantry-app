import React from "react";
import { useState } from "react";
import "../CSS/shopping-list.css";

export default function ShoppingList() {
  const [statedItem, setItem] = useState([]);

  function addItem() {
    let input = document.querySelector(".inputElement").value;
    setItem([...statedItem, input]);
    document.querySelector(".inputElement").value = ""; // Emptying the input element after adding the item
  }

  function deleteItem(index) {
    let updatedItemState = [...statedItem];
    updatedItemState.splice(index, 1);
    setItem(updatedItemState);
  }

  return (
    <div>
      <h1>Shopping List</h1>
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
      <div className="shopping-list-toolbar">
        <input type="text" className="inputElement" />
        <button className="buttonSubmit" onClick={addItem}>
          Add
        </button>
      </div>
    </div>
  );
}
