// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-auth-8d5cf.firebaseapp.com",
  projectId: "mern-auth-8d5cf",
  storageBucket: "mern-auth-8d5cf.appspot.com",
  messagingSenderId: "900872815450",
  appId: "1:900872815450:web:f5aac48c3475209c6e2963",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
