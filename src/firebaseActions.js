import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export const addToCollection = (collName, item, callback = null) => {
  addDoc(collection(db, collName), item).then(() => {
    if (callback) {
      callback();
    }
  });
};

export const deleteFromCollection = (collName, item) => {
  deleteDoc(doc(db, collName, item));
};
