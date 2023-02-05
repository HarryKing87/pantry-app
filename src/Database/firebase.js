// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjpiNp1Po5Ps6iDxuscA-ulvVtr3MfASQ",
  authDomain: "pantry-app-c3916.firebaseapp.com",
  projectId: "pantry-app-c3916",
  storageBucket: "pantry-app-c3916.appspot.com",
  messagingSenderId: "886634612358",
  appId: "1:886634612358:web:5698c428ae39d25aa8f307",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;