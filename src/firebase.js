import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8gXT5g1YRWbnNdp9Ue0fWNSDZyRnZtHo",
  authDomain: "beauty-app-9b6f7.firebaseapp.com",
  projectId: "beauty-app-9b6f7",
  storageBucket: "beauty-app-9b6f7.firebasestorage.app",
  messagingSenderId: "579380582275",
  appId: "1:579380582275:web:6ab94b39cf6e0d157248b6",
  measurementId: "G-ST8HSZT6DP"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);