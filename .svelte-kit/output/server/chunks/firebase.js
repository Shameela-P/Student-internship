import { getDatabase } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
//#endregion
//#region src/lib/firebase.js
var firebaseConfig = {
	apiKey: "AIzaSyDPr1lV-ChuWz91HhfReg8L21WKqmH0s-g",
	authDomain: "internship-portal-705f1.firebaseapp.com",
	databaseURL: "https://internship-portal-705f1-default-rtdb.firebaseio.com",
	projectId: "internship-portal-705f1",
	storageBucket: "internship-portal-705f1.firebasestorage.app",
	messagingSenderId: "784418638868",
	appId: "1:784418638868:web:bbddff4d4780fd758d2b01",
	measurementId: "G-3M6J8P7Y4G"
};
var app;
if (!getApps().length) app = initializeApp(firebaseConfig);
else app = getApp();
getAuth(app);
getDatabase(app);
var storage = getStorage(app);
var googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");
//#endregion
export { storage as n, app as t };
