// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9vVol6IVQXm73VMxReoVR-ZiFHq2C4IQ",
  authDomain: "sportek-9d071.firebaseapp.com",
  projectId: "sportek-9d071",
  storageBucket: "sportek-9d071.appspot.com",
  messagingSenderId: "728920932991",
  appId: "1:728920932991:web:084adb65e5577db922b54a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);