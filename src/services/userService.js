import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const getUserProfile = async (userId) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
    return userDoc.data();
  }
  throw new Error('User not found');
};

export const updateUserProfile = (userId, profileData) => updateDoc(doc(db, 'users', userId), profileData);
