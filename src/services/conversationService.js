import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export const getConversations = async (userId) => {
  // eslint-disable-next-line no-useless-catch
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
  // eslint-disable-next-line no-useless-catch
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
  // eslint-disable-next-line no-useless-catch
  try {
    const conversationRef = doc(db, "conversations", conversationId);
    await updateDoc(conversationRef, {
      messages: [...(await getDocs(conversationRef)).data().messages, message],
    });
  } catch (error) {
    throw error;
  }
};
