import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ChatContext } from "../../../../contexts/ChatContext";
import { DiscussionContext } from "../../../../contexts/DiscussionContext";
import { db } from "../../../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import Input from "../Input/Input";

const DiscussionInput = () => {
  const { currentUser } = useContext(AuthContext);
  const { data: chatData } = useContext(ChatContext);
  const { data: discussionData } = useContext(DiscussionContext);

  const handleSendMessage = async (messageData) => {
    if (!discussionData.originMessage) return;

    try {
      // Add reply to discussion
      const replyRef = await addDoc(
        collection(
          db,
          "chats",
          chatData.chatId,
          "messages",
          discussionData.originMessage.id,
          "replies"
        ),
        {
          ...messageData,
          senderId: currentUser.uid,
          createdAt: serverTimestamp(),
        }
      );

      // Update original message with reply count
      await updateDoc(
        doc(
          db,
          "chats",
          chatData.chatId,
          "messages",
          discussionData.originMessage.id
        ),
        {
          replyCount: (discussionData.replies.length || 0) + 1,
          lastReplyAt: serverTimestamp(),
        }
      );

      console.log("Reply sent:", replyRef.id);
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div className="border-t p-3">
      <Input
        onSendMessage={handleSendMessage}
        inputPlaceholder="Type a reply..."
        containerClassName="min-h-[86px]"
        eslToolClassName="mb-2"
      />
    </div>
  );
};

export default DiscussionInput;
