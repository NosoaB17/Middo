import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";

const formatTime = (date) => {
  if (!date) return "";
  return date
    .toDate()
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (date) => {
  if (!date) return "";
  return date
    .toDate()
    .toLocaleDateString([], { year: "numeric", month: "long", day: "numeric" });
};

const MessageList = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.messages]);

  let lastDate = null;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {data.messages.map((message, index) => {
        const showDateSeparator = lastDate !== formatDate(message.date);
        if (showDateSeparator) {
          lastDate = formatDate(message.date);
        }

        const isCurrentUser = message.senderId === currentUser.uid;

        return (
          <React.Fragment key={message.id}>
            {showDateSeparator && (
              <div className="text-center text-xs text-gray-500 my-2">
                <span className="text-xs font-light text-neutral-500 ">
                  {lastDate}, {formatTime(message.date)}
                </span>
              </div>
            )}
            <div
              className={`relative flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative max-w-[70%] rounded-2xl p-3 ${
                  isCurrentUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                style={{
                  borderBottomRightRadius: isCurrentUser ? "4px" : undefined,
                  borderBottomLeftRadius: !isCurrentUser ? "4px" : undefined,
                }}
              >
                <p className="break-words mb-1">{message.text}</p>
                <div className="text-xs italic mt-1 opacity-70">
                  {message.text}
                </div>
                <div
                  className={`absolute bottom-0 w-4 h-4 ${
                    isCurrentUser ? "right-0 bg-blue-500" : "left-0 bg-gray-200"
                  }`}
                  style={{
                    borderRadius: isCurrentUser ? "0 0 4px 0" : "0 0 0 4px",
                    boxShadow: isCurrentUser
                      ? "-2px -2px 0 0 #3b82f6"
                      : "2px -2px 0 0 #e5e7eb",
                  }}
                />
              </div>
            </div>
          </React.Fragment>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageList;
