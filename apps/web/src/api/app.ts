import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA6iqeCPtd_Hg-Dt-hS6yfo9tbA6xGswkc",
  authDomain: "crin-production.firebaseapp.com",
  projectId: "crin-production",
  storageBucket: "crin-production.appspot.com",
  messagingSenderId: "334083918437",
  appId: "1:334083918437:web:47d8ea435c0cff02f4548c",
  measurementId: "G-P4GVRWEE9K",
};

const app = initializeApp(firebaseConfig);

export default app;
