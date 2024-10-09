import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZS1pPXCs94-A14cExRnGQuRoG0g98yog",
  authDomain: "middoapp-4e2ad.firebaseapp.com",
  projectId: "middoapp-4e2ad",
  storageBucket: "middoapp-4e2ad.appspot.com",
  messagingSenderId: "513631922811",
  appId: "1:513631922811:web:743ab5ddafb0f39cf510de",
  measurementId: "G-DE09B6SPTN",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
