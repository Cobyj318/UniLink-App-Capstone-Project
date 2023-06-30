// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXBDXZU8yoiykBHaaaIfPr4KIxLFkgc4E",
  authDomain: "uni-link-b79d0.firebaseapp.com",
  projectId: "uni-link-b79d0",
  storageBucket: "uni-link-b79d0.appspot.com",
  messagingSenderId: "286725607317",
  appId: "1:286725607317:web:7c9620e65166dfffa7b09c",
  measurementId: "G-5KPCRH3GPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

const db = getDatabase();
export { db }