
// 📁 firebase/firebaseConfig.ts
// ✅ Yahan apna Firebase project ka config paste karo

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAO1N2NbpibiXRfbToMb2F_6_7_XZeIjBg",
  authDomain: "kumbh-kart.firebaseapp.com",
  projectId: "kumbh-kart",
  storageBucket: "kumbh-kart.firebasestorage.app",
  messagingSenderId: "491925309116",
  appId: "1:491925309116:web:55f37e36f76c6917fe32b9",
  measurementId: "G-9XDEGF0JBC"
};


// App already initialized hoti hai toh duplicate avoid karo
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;