// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCulGHCiKhTSdL3L7IVi1q7DdP42rf-upA",
  authDomain: "portfolioarquitecto.firebaseapp.com",
  projectId: "portfolioarquitecto",
  storageBucket: "portfolioarquitecto.appspot.com",
  messagingSenderId: "1052297305390",
  appId: "1:1052297305390:web:9829cd38bd2daf74feeebf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const loginAdmin = (data) => {
  console.log(data);
};

export const saveWork = (data) => {
  addDoc(collection(db, "works"), data);
};
