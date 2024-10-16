import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const signUp = async (email, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      email,
    });
    await setDoc(doc(db, "userChats", res.user.uid), {});
    return res.user;
  } catch (err) {
    throw err;
  }
};

export const signIn = async (email, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    throw err;
  }
};

export const signInWithGoogle = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      await setDoc(doc(db, "userChats", user.uid), {});
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};
