// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore"; // Import Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpCdTQ-yJkOEDD9xqsUVXQI2UMVpagwLg",
  authDomain: "portfolio-generator-41a5a.firebaseapp.com",
  projectId: "portfolio-generator-41a5a",
  storageBucket: "portfolio-generator-41a5a.firebasestorage.app",
  messagingSenderId: "318949959632",
  appId: "1:318949959632:web:9d181e418dc2e200223bd5",
  measurementId: "G-B43D6BZ57V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore database

export { db };
