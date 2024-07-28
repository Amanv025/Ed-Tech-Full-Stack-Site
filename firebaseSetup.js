import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStripePayments } from "@invertase/firestore-stripe-payments";
import { firebaseConfig } from "../edtech-project/firebaseconfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Stripe Payments
const payments = getStripePayments(app, {
  productsCollection: "courses", // Collection for courses
  customersCollection: "customers", // Collection for customers (optional)
});

export { db, payments };
