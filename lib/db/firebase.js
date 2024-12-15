import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBqNQS-mSNVBvOdYJjL54uV0Wby39NYUHQ",
  authDomain: "project1-d1a68.firebaseapp.com",
  databaseURL:
    "https://project1-d1a68-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project1-d1a68",
  storageBucket: "project1-d1a68.firebasestorage.app",
  messagingSenderId: "1006049720145",
  appId: "1:1006049720145:web:2674e110151b073df5c570",
};

const dbApp = initializeApp(firebaseConfig);
export default dbApp;
