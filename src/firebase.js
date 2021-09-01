import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1fAWQMFyz9rVjG-WO0ke9Q22zGhQ_EtY',
  authDomain: 'auth-project-26cd4.firebaseapp.com',
  projectId: 'auth-project-26cd4',
  storageBucket: 'auth-project-26cd4.appspot.com',
  messagingSenderId: '226057208488',
  appId: '1:226057208488:web:ab864a1f6821ecb81af89d',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


export default app;
