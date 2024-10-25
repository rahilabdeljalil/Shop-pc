// https://realtime-database-e3691-default-rtdb.europe-west1.firebasedatabase.app/

// https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  databaseURL:
    "https://realtime-database-e3691-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const pcShopping = ref(db, "pc-shopping");

// HTML element references
const inputEl = document.getElementById("input-el");
const cartBtn = document.getElementById("cart-btn");
const cartList = document.getElementById("cart-list");

// Event listener for button
cartBtn.addEventListener("click", function () {
  const item = inputEl.value;
  // Push item to Firebase
  push(pcShopping, item);
  
});

onValue(pcShopping, function (snapshot) {
  let snapVal = snapshot.val();

  let snapVallArry = Object.entries(snapVal);
 // Clear cart list before adding new items
 cartList.innerHTML = "";
      for (let i = 0; i < snapVallArry.length; i++) {
             shoppingNames(snapVallArry[i]);
      }

  console.log(snapVal);
});

function shoppingNames(itemNames) {
 
          let itemNameId = itemNames[0];

          let itemNameValue = itemNames[1];

  // Create list item
          let listElement = document.createElement("li");

            listElement.textContent += itemNameValue;

              cartList.append(listElement);



  listElement.addEventListener("dblclick", function () {
    
    remove(ref(db, `pc-shopping/${itemNameId}`));
    listElement.remove(); // Remove item from list after clicking on it
    // Remove item from list after clicking on it
  });



  // Clear input field after adding
}
