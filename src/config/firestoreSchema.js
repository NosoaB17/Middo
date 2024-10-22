// src/config/firestoreSchema.js

/**
 * Định nghĩa cấu trúc collection và documents trong Firestore
 *
 * Collection Structure:
 * - users/
 *   - {userId}/
 *     - displayName: string
 *     - email: string
 *     - photoURL: string
 *
 * - chats/
 *   - {chatId}/
 *     - messages/
 *       - {messageId}/
 *         - text: string
 *         - senderId: string
 *         - date: timestamp
 *         - translatedText?: string
 *         - detectedLanguage?: string
 *         - replies/
 *           - {replyId}/
 *             - text: string
 *             - senderId: string
 *             - userName: string
 *             - userPhotoURL: string
 *             - date: timestamp
 *             - messageId: string
 *
 * - userChats/
 *   - {userId}/
 *     - {chatId}: {
 *         lastMessage: { text: string },
 *         timestamp: timestamp
 *       }
 */

export const collections = {
  USERS: "users",
  CHATS: "chats",
  USER_CHATS: "userChats",
  MESSAGES: "messages",
  REPLIES: "replies",
};

export const messageSchema = {
  text: String,
  senderId: String,
  date: Date,
  translatedText: String,
  detectedLanguage: String,
};

export const replySchema = {
  text: String,
  senderId: String,
  userName: String,
  userPhotoURL: String,
  date: Date,
  messageId: String,
};
