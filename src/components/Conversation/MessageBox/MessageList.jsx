import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";

// Hàm helper để định dạng thời gian
const formatTime = (date) => {
  if (!date) return "";
  return date
    .toDate()
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const MessageList = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {data.messages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-4 ${
            message.senderId === currentUser.uid
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.senderId === currentUser.uid
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <p className="break-words">{message.text}</p>
            <span className="text-xs mt-1 block text-right">
              {formatTime(message.date)}
            </span>
          </div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageList;
