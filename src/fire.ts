// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU0VHI8bY9plr9qFbC4_n-XGvcrndMNAg",
  authDomain: "sapp-space.firebaseapp.com",
  projectId: "sapp-space",
  storageBucket: "sapp-space.appspot.com",
  messagingSenderId: "535118992912",
  appId: "1:535118992912:web:2823fca5bdd1c38a1f5c95",
  measurementId: "G-12LF4T5K28"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);