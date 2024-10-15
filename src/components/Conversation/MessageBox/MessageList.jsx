import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";

const formatTime = (date) => {
  if (!date || typeof date.toDate !== "function") return "";
  return date
    .toDate()
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (date) => {
  if (!date || typeof date.toDate !== "function") return "";
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

  const shouldShowTimestamp = (currentDate, previousDate) => {
    if (!currentDate || !previousDate) return true;
    const timeDiff =
      currentDate.toDate().getTime() - previousDate.toDate().getTime();
    return timeDiff >= 3600000; // 1 hour in milliseconds
  };

  if (!data || !Array.isArray(data.messages)) {
    return (
      <div className="flex justify-center items-center h-full">No messages</div>
    );
  }

  let lastDate = null;
  let lastTimestamp = null;

  return (
    <div className="relative flex h-full w-full flex-1 overflow-hidden">
      <div className="relative bg-primary/5 flex w-full flex-1 flex-col gap-2.5 overflow-x-hidden overflow-y-scroll px-2 md:px-3">
        {data.messages.map((message, index) => {
          const showDateSeparator = lastDate !== formatDate(message.date);
          const showTimestamp = shouldShowTimestamp(
            message.date,
            lastTimestamp
          );

          if (showDateSeparator) {
            lastDate = formatDate(message.date);
          }

          if (showTimestamp) {
            lastTimestamp = message.date;
          }

          const isCurrentUser = message.senderId === currentUser.uid;

          return (
            <React.Fragment key={message.id}>
              {showDateSeparator && (
                <div className="my-3 flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center">
                    <div className="bg-primary/30 h-[1px] flex-grow"></div>
                    <span className="text-xs font-light text-neutral-500 dark:text-neutral-200 px-2">
                      {lastDate}
                    </span>
                    <div className="bg-primary/30 h-[1px] flex-grow"></div>
                  </div>
                </div>
              )}
              {showTimestamp && !showDateSeparator && (
                <div className="my-2 flex items-center justify-center">
                  <span className="text-xs font-light text-neutral-500 dark:text-neutral-200">
                    {formatTime(message.date)}
                  </span>
                </div>
              )}
              <div
                className={`relative flex text-sm ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-[70%] rounded-2xl px-3 py-2 md:py-1 pb-3 md:pb-3 ${
                    isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-[#f2f2f2] text-black"
                  }`}
                >
                  <p className="break-word-mt text-start mb-1">
                    {message.text}
                  </p>
                  <div
                    className={`relative items-center rounded-md p-0.5 px-2 ${
                      isCurrentUser
                        ? "right-0 bg-blue-400"
                        : "left-0 bg-[#0000000d]"
                    }`}
                  >
                    <div className="text-start">{message.text}</div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={scrollRef} />
      </div>
    </div>
  );
};

export default MessageList;
