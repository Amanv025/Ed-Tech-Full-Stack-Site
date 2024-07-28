// firebaseconfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAvTs0avcIwVs9C2WgsD-XGhvyeL9RFUk",
  authDomain: "edtech-project-9a72a.firebaseapp.com",
  projectId: "edtech-project-9a72a",
  storageBucket: "edtech-project-9a72a.appspot.com",
  messagingSenderId: "656992686711",
  appId: "1:656992686711:web:c359b0d1dfad4880392c72",
  measurementId: "G-WCYEGQ7L5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, firestore, analytics,googleProvider };
