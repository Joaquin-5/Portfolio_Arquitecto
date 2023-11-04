import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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

/* const auth = getAuth();
connectAuthEmulator(auth, "http://127.0.0.1:5500/frontend/appAdmin/index.html");

export const loginAdmin = async (data) => {
  const email = data.email;
  const password = data.password;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userData = userCredential.user;
    console.log(userData);
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const saveWork = (data) => {
  addDoc(collection(db, "works"), data);
}; */
