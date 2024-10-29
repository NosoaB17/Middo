import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import Header from "./Header";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import Discussion from "./Discussion";

import Start from "../../../assets/conversation/Start.png";

const MessageBox = () => {
  const { data } = useContext(ChatContext);
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  const [discussionMessageId, setDiscussionMessageId] = useState(null);

  useEffect(() => {
    if (isDiscussionOpen) {
      setIsDiscussionOpen(false);
      setDiscussionMessageId(null);
    }
  }, [data.chatId]);

  const handleOpenDiscussion = (messageId) => {
    setDiscussionMessageId(messageId);
    setIsDiscussionOpen(true);
  };

  const handleCloseDiscussion = () => {
    setIsDiscussionOpen(false);
    setDiscussionMessageId(null);
  };

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden rounded-lg bg-card md:rounded-none mt-5">
      {data.chatId !== "null" ? (
        <>
          <div className="relative flex flex-1 overflow-hidden">
            <div
              className={`relative flex h-full w-full flex-col overflow-hidden ${
                isDiscussionOpen ? "w-2/3" : "w-full"
              }`}
            >
              <Header />
              <div className="relative flex h-full w-full flex-1 overflow-hidden">
                <MessageList onOpenDiscussion={handleOpenDiscussion} />
              </div>
              <div className="relative w-full border-t p-2">
                <ChatInput />
              </div>
            </div>
            {isDiscussionOpen && (
              <Discussion
                messageId={discussionMessageId}
                onClose={handleCloseDiscussion}
              />
            )}
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <img src={Start} />
        </div>
      )}
    </div>
  );
};

export default MessageBox;
