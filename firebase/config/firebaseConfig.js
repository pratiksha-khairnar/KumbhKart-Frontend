// ✅ Imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

<<<<<<< HEAD
=======
// ✅ Firebase config
>>>>>>> 49315eee6efac569d2dc9239ba360c3aafaaedb0
const firebaseConfig = {
  apiKey: "AIzaSyAO1N2NbpibiXRfbToMb2F_6_7_XZeIjBg",
  authDomain: "kumbh-kart.firebaseapp.com",
  projectId: "kumbh-kart",
  storageBucket: "kumbh-kart.firebasestorage.app",
  messagingSenderId: "491925309116",
  appId: "1:491925309116:web:55f37e36f76c6917fe32b9",
  measurementId: "G-9XDEGF0JBC"
};

<<<<<<< HEAD
// ✅ FIRST initialize
const app = initializeApp(firebaseConfig);

// ✅ THEN export
export const auth = getAuth(app);
export const db = getFirestore(app);

=======
// ✅ STEP 1: Initialize app FIRST
const app = initializeApp(firebaseConfig);

// ✅ STEP 2: THEN use app
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Optional
>>>>>>> 49315eee6efac569d2dc9239ba360c3aafaaedb0
export default app;