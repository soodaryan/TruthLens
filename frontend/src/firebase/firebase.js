// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8D6to9WHXuulh-hpCr2F6ORAv1dl95ag",
  authDomain: "truthlens-e5899.firebaseapp.com",
  projectId: "truthlens-e5899",
  storageBucket: "truthlens-e5899.firebasestorage.app",
  messagingSenderId: "158575846753",
  appId: "1:158575846753:web:af3f3da655539160455120",
  measurementId: "G-B1LCX6CSKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};