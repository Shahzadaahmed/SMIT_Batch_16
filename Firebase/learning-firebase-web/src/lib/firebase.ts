// Firebase configuration and initialization...!

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"; // for authentication
import { getFirestore } from "firebase/firestore"; // for firestore database
import { getStorage } from "firebase/storage"; // for firebase storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE9OJhdBGCDFs75qRA7r6PvdBmuedozR8",
  authDomain: "learning-firebase-with-next-js.firebaseapp.com",
  projectId: "learning-firebase-with-next-js",
  storageBucket: "learning-firebase-with-next-js.firebasestorage.app",
  messagingSenderId: "532450778952",
  appId: "1:532450778952:web:257c7cfe8b90d76bfc9d7d",
  measurementId: "G-L9JJTLE24V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Database
const db = getFirestore(app);

export { app, auth, db };
