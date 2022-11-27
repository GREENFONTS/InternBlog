import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcWoDrtDGbJEI-gqpiw4NfrT4WW0oXyEs",
  authDomain: "blogapp-cee34.firebaseapp.com",
  projectId: "blogapp-cee34",
  storageBucket: "blogapp-cee34.appspot.com",
  messagingSenderId: "674044502120",
  appId: "1:674044502120:web:c6ee84db267befbb58dbdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
