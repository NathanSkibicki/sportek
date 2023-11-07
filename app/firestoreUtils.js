// firebaseUtils.js
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export const readTestFieldFromFirestore = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        return userDoc.data().testfield;
    } else {
        return '';
    }
};
