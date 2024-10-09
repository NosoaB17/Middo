import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const getConversations = async (userId) => {
  try {
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const createConversation = async (participants, initialMessage) => {
  try {
    const docRef = await addDoc(collection(db, "conversations"), {
      participants,
      messages: [initialMessage],
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (conversationId, message) => {
  try {
    const conversationRef = doc(db, "conversations", conversationId);
    await updateDoc(conversationRef, {
      messages: [...(await getDoc(conversationRef)).data().messages, message],
    });
  } catch (error) {
    throw error;
  }
};
