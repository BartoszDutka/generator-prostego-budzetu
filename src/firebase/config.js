import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB_Vc8TP6eQMFvUjo_k70T3rirmvqv0yQU",
  authDomain: "generatorprostegobudzetu.firebaseapp.com",
  projectId: "generatorprostegobudzetu",
  storageBucket: "generatorprostegobudzetu.firebasestorage.app",
  messagingSenderId: "276252765894",
  appId: "1:276252765894:web:e511daaceb518442e6f1c7",
  measurementId: "G-VHS0D3DTBL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
