// src/services/credenciaisFirebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1pSVrxZSB3TBqpeTQ3nIZmCXv6NpmDQM",
  authDomain: "projetoauthdavi.firebaseapp.com",
  projectId: "projetoauthdavi",
  storageBucket: "projetoauthdavi.firebasestorage.app",
  messagingSenderId: "830628937487",
  appId: "1:830628937487:web:f588d40b1ead3a4eeb487a"
};

// Inicializa o App
const appFirebase = initializeApp(firebaseConfig);

// **NOVO**: inicializa e exporta o Firestore
export const db = getFirestore(appFirebase);

// Mantém export default do App (útil caso queira)
export default appFirebase;
