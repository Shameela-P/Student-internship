import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
//#region src/lib/firebase.js
var firebaseConfig = {
	apiKey: "AIzaSyBAwbR6owxePlLLKfFs3BylphtCAQbjBn0",
	authDomain: "student-internship-porta-1797a.firebaseapp.com",
	databaseURL: "https://student-internship-porta-1797a-default-rtdb.firebaseio.com",
	projectId: "student-internship-porta-1797a",
	storageBucket: "student-internship-porta-1797a.firebasestorage.app",
	messagingSenderId: "81785625764",
	appId: "1:81785625764:web:5946caf4ae86d17df1da31",
	measurementId: "G-FHJ97WFDWB"
};
var app;
if (!getApps().length) app = initializeApp(firebaseConfig);
else app = getApp();
getAuth(app);
new GoogleAuthProvider();
getStorage(app);
//#endregion
export { app as t };
