
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCBhTZxbmIHDcSfscBmhstMpL-t3A89KA",
  authDomain: "maker-project-13166.firebaseapp.com",
  projectId: "maker-project-13166",
  storageBucket: "maker-project-13166.appspot.com",
  messagingSenderId: "489445184712",
  appId: "1:489445184712:web:00adb5524a57b0dee441fd",
  measurementId: "G-DP4CBB79MN"

};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);

// Inicialize o Firestore
const firestore = getFirestore(app);

export default firestore; // Exporte o Firestore

