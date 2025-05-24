// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3HEMQ-qRjpwzLtvJvWP-ol-HiIKO79rY",
  authDomain: "atividade2davipeixotounipam.firebaseapp.com",
  projectId: "atividade2davipeixotounipam",
  storageBucket: "atividade2davipeixotounipam.firebasestorage.app",
  messagingSenderId: "940501433200",
  appId: "1:940501433200:web:ab579409036db727c3edb5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
