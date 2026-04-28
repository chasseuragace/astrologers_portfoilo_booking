import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqk6AeeEUOaIA8X-7aFCJ0DwQDkxe6OBY",
  authDomain: "swaag-11abc.firebaseapp.com",
  projectId: "swaag-11abc",
  storageBucket: "swaag-11abc.firebasestorage.app",
  messagingSenderId: "986253065230",
  appId: "1:986253065230:web:f89a02381923f946b6905f",
  measurementId: "G-9NVQYVJB8L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
