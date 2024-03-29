// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  collection,
  getFirestore,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
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

export const saveWork = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "works"), data);
    return docRef; // Devuelve el documento creado
  } catch (error) {
    console.error("Error al guardar la obra:", error);
    throw error; // Relanza el error para que pueda ser manejado en el código que llama a saveWork
  }
};

export const getWorkById = async (workId) => {
  try {
    const workRef = doc(db, "works", workId);
    const workDoc = await getDoc(workRef);

    if (workDoc.exists()) {
      return workDoc.data();
    } else {
      console.log("No existe la obra con el ID proporcionado");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la obra:", error);
    return null;
  }
};

export const getWorks = async () => {
  let works = [];
  const querySnapshot = await getDocs(collection(db, "works"));
  querySnapshot.forEach((doc) => {
    // Id del documento
    const id = doc.id;

    // Datos del documento
    const data = doc.data();

    works.push({ id, ...data });
  });
  return works;
};

export const deleteWork = async (workId) => {
  try {
    // Elimina el documento utilizando el ID único
    const workRef = doc(db, "works", workId);
    await deleteDoc(workRef);
  } catch (error) {
    console.error("Error al eliminar el trabajo:", error);
  }
};

export const uploadFile = async (file) => {
  // Verificar que 'file' no sea null ni undefined
  if (!file) {
    console.error("El archivo es nulo o indefinido.");
    return null; // O devuelve lo que sea apropiado en tu caso
  }

  const storageRef = ref(storage, "imagenes-trabajos/" + file.name);

  await uploadBytes(storageRef, file);

  const imageUrl = await getDownloadURL(storageRef);

  return imageUrl;
};
