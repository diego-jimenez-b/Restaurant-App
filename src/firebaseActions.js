import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export const addToCollection = (collName, item) => {
  return addDoc(collection(db, collName), item);
};

export const deleteFromCollection = (collName, item) => {
  deleteDoc(doc(db, collName, item));
};
