import { signOut } from "firebase/auth";
import { auth } from "../Database/firebase";

// SIGN OUT FUNCTIONALITY
let logoutTimeout;

// Function to reset the logout timer
export function resetLogoutTimer() {
  clearTimeout(logoutTimeout);
  logoutTimeout = setTimeout(handleSignOut, 3 * 60 * 60 * 1000); // 3 hours
}

// Function to handle user activity
export function handleUserActivity() {
  resetLogoutTimer();
}

// Function to handle user logout
function handleSignOut() {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out user:", error);
    });
}

// Add event listeners to reset the logout timer on user activity
document.addEventListener("click", handleUserActivity);

// Call resetLogoutTimer() initially to start the logout timer
resetLogoutTimer();
