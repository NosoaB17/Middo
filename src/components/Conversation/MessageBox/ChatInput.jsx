import { useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import Input from "./Input/Input";

const ChatInput = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSendMessage = async (messageData) => {
    if (!data.chatId || data.chatId === "null") return;

    try {
      await addDoc(collection(db, "chats", data.chatId, "messages"), {
        ...messageData,
        senderId: currentUser.uid,
        date: serverTimestamp(),
      });

      const lastMessageText =
        messageData.type === "file"
          ? `Sent a file: ${messageData.fileData.name}`
          : messageData.text;

      // Update last message for both users
      const updateData = {
        [`${data.chatId}.lastMessage`]: { text: lastMessageText },
        [`${data.chatId}.date`]: serverTimestamp(),
      };

      await Promise.all([
        updateDoc(doc(db, "userChats", currentUser.uid), updateData),
        updateDoc(doc(db, "userChats", data.user.uid), updateData),
      ]);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <Input
      onSendMessage={handleSendMessage}
      inputPlaceholder="Type a message"
    />
  );
};

export default ChatInput;
