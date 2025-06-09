// db.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7PJpjIaryRBnrcTzB4tSF_3FgL2eMdDw",
  authDomain: "phishguard-ai-f8e71.firebaseapp.com",
  projectId: "phishguard-ai-f8e71",
  storageBucket: "phishguard-ai-f8e71.firebasestorage.app",
  messagingSenderId: "10631846772",
  appId: "1:10631846772:web:58d5d4f986e1cafdd5ea21",
  measurementId: "G-S3SRJQHMF9"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

export { db };
