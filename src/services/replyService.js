import { db } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { collections } from "../config/firestoreSchema";

export const replyService = {
  // Thêm reply mới
  async addReply(chatId, messageId, replyData) {
    try {
      const replyRef = collection(
        db,
        collections.CHATS,
        chatId,
        collections.MESSAGES,
        messageId,
        collections.REPLIES
      );

      const docRef = await addDoc(replyRef, {
        ...replyData,
        timestamp: serverTimestamp(),
      });

      return docRef.id;
    } catch (error) {
      console.error("Error adding reply:", error);
      throw error;
    }
  },

  // Lấy danh sách replies của một message
  async getReplies(chatId, messageId) {
    try {
      const repliesRef = collection(
        db,
        collections.CHATS,
        chatId,
        collections.MESSAGES,
        messageId,
        collections.REPLIES
      );

      const q = query(repliesRef, orderBy("timestamp", "asc"));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting replies:", error);
      throw error;
    }
  },

  // Xóa reply
  async deleteReply(chatId, messageId, replyId) {
    try {
      const replyRef = doc(
        db,
        collections.CHATS,
        chatId,
        collections.MESSAGES,
        messageId,
        collections.REPLIES,
        replyId
      );

      await deleteDoc(replyRef);
    } catch (error) {
      console.error("Error deleting reply:", error);
      throw error;
    }
  },

  async updateReply(chatId, messageId, replyId, updateData) {
    try {
      const replyRef = doc(
        db,
        collections.CHATS,
        chatId,
        collections.MESSAGES,
        messageId,
        collections.REPLIES,
        replyId
      );

      await updateDoc(replyRef, updateData);
    } catch (error) {
      console.error("Error updating reply:", error);
      throw error;
    }
  },
};
