// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyD2MJnsuThUXgeNVU6PeOIIZgkYYBdyHQU",
  authDomain: "splits-ad17a.firebaseapp.com",
  projectId: "splits-ad17a",
  storageBucket: "splits-ad17a.appspot.com",
  messagingSenderId: "601344669944",
  appId: "1:601344669944:web:822d43d7b61aaff36ee30d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage()
export {auth, db, storage}

