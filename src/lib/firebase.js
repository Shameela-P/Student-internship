import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { env } from '$env/dynamic/public';

import { 
  PUBLIC_FIREBASE_API_KEY, 
  PUBLIC_FIREBASE_AUTH_DOMAIN, 
  PUBLIC_FIREBASE_DATABASE_URL, 
  PUBLIC_FIREBASE_PROJECT_ID, 
  PUBLIC_FIREBASE_STORAGE_BUCKET, 
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID, 
  PUBLIC_FIREBASE_APP_ID, 
  PUBLIC_FIREBASE_MEASUREMENT_ID 
} from '$env/static/public';

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: PUBLIC_FIREBASE_DATABASE_URL,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID,
  measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
=======
  apiKey: env.PUBLIC_FIREBASE_API_KEY,
  authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.PUBLIC_FIREBASE_APP_ID,
  measurementId: env.PUBLIC_FIREBASE_MEASUREMENT_ID
>>>>>>> 5d366a2a4dc395f3384571ee5f12913df8f6d8b8
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
