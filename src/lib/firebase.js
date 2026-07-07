import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPr1lV-ChuWz91HhfReg8L21WKqmH0s-g",
  authDomain: "internship-portal-705f1.firebaseapp.com",
  databaseURL: "https://internship-portal-705f1-default-rtdb.firebaseio.com",
  projectId: "internship-portal-705f1",
  storageBucket: "internship-portal-705f1.firebasestorage.app",
  messagingSenderId: "784418638868",
  appId: "1:784418638868:web:bbddff4d4780fd758d2b01",
  measurementId: "G-3M6J8P7Y4G"
};

// Initialize Firebase only once
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export { app, auth, googleProvider, storage };
