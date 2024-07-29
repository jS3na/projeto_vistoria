import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1KUJ0aE2sir0schFqSqoLmkk-X1DM1LM",
  authDomain: "pavcon-vistoria.firebaseapp.com",
  databaseURL: "https://pavcon-vistoria-default-rtdb.firebaseio.com",
  projectId: "pavcon-vistoria",
  storageBucket: "pavcon-vistoria.appspot.com",
  messagingSenderId: "734892396568",
  appId: "1:734892396568:web:cdd63a04b822d225c4b36d",
  measurementId: "G-C8ZTBPKX85"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte a instância do Firestore
export const firestore = getFirestore(app);
