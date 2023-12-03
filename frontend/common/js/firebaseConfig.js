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
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

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

const storage = getStorage(app);

export const loginAdmin = (data) => {
  const { email, password } = data;

  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        reject(errorMessage);
      });
  });
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const saveWork = (data) => {
  addDoc(collection(db, "works"), data);
};

export const uploadFile = async (file) => {
  const storageRef = ref(storage, "imagenes-trabajos/" + file.name);

  await uploadBytes(storageRef, file);

  const imageUrl = await getDownloadURL(storageRef);

  return imageUrl;
};
