import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    await updateDoc(doc(db, "users", userId), profileData);
  } catch (error) {
    throw error;
  }
};
