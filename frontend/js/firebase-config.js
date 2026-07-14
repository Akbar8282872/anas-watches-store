import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ==========================================
// CRITICAL: PASTE YOUR FIREBASE CONFIG HERE
// ==========================================
// I cannot access your Gmail to create the database. 
// Go to console.firebase.google.com -> Add Project -> Add Web App
// Copy the configuration object they give you and paste it below:

const firebaseConfig = {
  apiKey: "AIzaSyD1UHj3tRfjpknCW5LyxzVpBMuORjQw8Yo",
  authDomain: "anas-watches.firebaseapp.com",
  projectId: "anas-watches",
  storageBucket: "anas-watches.firebasestorage.app",
  messagingSenderId: "969091370398",
  appId: "1:969091370398:web:9963897ef56c5f76eb1a8f",
  measurementId: "G-7L6G6JWPVH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
