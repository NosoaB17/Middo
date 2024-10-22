import { useContext, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import Header from "./MessageBox/Header";
import MessageList from "./MessageBox/MessageList";
import InputBox from "./MessageBox/InputBox";
import Discussion from "./MessageBox/Discussion";

const MessageBox = () => {
  const { data } = useContext(ChatContext);
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  const [discussionMessageId, setDiscussionMessageId] = useState(null);

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
                <InputBox />
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
          <p className="text-gray-500">
            Select a conversation to start chatting
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
