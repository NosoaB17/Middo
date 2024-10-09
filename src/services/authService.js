import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// Helper function to create or update user document
const createOrUpdateUserDoc = async (user) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || null,
      email: user.email,
      photoURL: user.photoURL || null,
    });
    await setDoc(doc(db, 'userChats', user.uid), {});
  }
};

export const signUp = async (email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await createOrUpdateUserDoc(res.user);
  return res.user;
};

export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  await createOrUpdateUserDoc(result.user);
  return result.user;
};

export const logout = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);
