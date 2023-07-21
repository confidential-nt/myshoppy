import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBs07Act5ZHPZRLhcu7yI6By6Y6IVycGzw",
  authDomain: "shoppy-11b22.firebaseapp.com",
  projectId: "shoppy-11b22",
  storageBucket: "shoppy-11b22.appspot.com",
  messagingSenderId: "31659362398",
  appId: "1:31659362398:web:8bd1dea161f244ea980ccf",
  measurementId: "G-RS4BXVD8DD",
  databaseURL: "https://shoppy-11b22-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
