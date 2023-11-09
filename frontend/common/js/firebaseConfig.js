// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  collection,
  getFirestore,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { showToastify } from "./toastify.js";

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
const auth = getAuth();

export const loginAdmin = (data) => {
  console.log(data);
  const email = data.email;
  const password = data.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};

export const saveWork = (data) => {
  addDoc(collection(db, "works"), data);
};
