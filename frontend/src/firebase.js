// firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ Import GoogleAuthProvider

const firebaseConfig = {
  apiKey: "AIzaSyD7PJpjIaryRBnrcTzB4tSF_3FgL2eMdDw",
  authDomain: "phishguard-ai-f8e71.firebaseapp.com",
  projectId: "phishguard-ai-f8e71",
  storageBucket: "phishguard-ai-f8e71.firebasestorage.app",
  messagingSenderId: "10631846772",
  appId: "1:10631846772:web:58d5d4f986e1cafdd5ea21",
  measurementId: "G-S3SRJQHMF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // ✅ Create provider

export { auth, googleProvider };
