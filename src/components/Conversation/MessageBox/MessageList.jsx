// MessageList.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { SmilePlus, EllipsisVertical } from "lucide-react";

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
  const { data, dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const handleMessageClick = (messageId) => {
    setSelectedMessageId(messageId === selectedMessageId ? null : messageId);
  };
  const [hoveredMessageId, setHoveredMessageId] = useState(null);

  const handleSelectIcon = (messageId) => {
    console.log("Select icon for message:", messageId);
  };

  const handleMessageMenu = (messageId) => {
    console.log("Show menu for message:", messageId);
  };

  const scrollRef = useRef();

  useEffect(() => {
    if (data.chatId === "null") {
      console.log("No chat selected");
      return;
    }

    console.log("Fetching messages for chat:", data.chatId);
    const q = query(
      collection(db, "chats", data.chatId, "messages"),
      orderBy("date", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Message data:", data);
          return {
            id: doc.id,
            ...data,
          };
        });
        console.log("Messages updated:", messages.length, "messages");
        dispatch({ type: "SET_MESSAGES", payload: messages });
      },
      (error) => {
        console.error("Error fetching messages:", error);
      }
    );

    return () => unsubscribe();
  }, [data.chatId, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.messages]);

  const shouldShowTimestamp = (currentDate, previousDate) => {
    if (!currentDate || !previousDate) return true;
    const timeDiff =
      currentDate.toDate().getTime() - previousDate.toDate().getTime();
    return timeDiff >= 3600000;
  };

  let lastDate = null;
  let lastTimestamp = null;

  return (
    <div className="relative bg-primary/5 flex w-full flex-1 flex-col gap-2.5 overflow-x-hidden overflow-y-scroll px-2 md:px-3">
      {data.messages.map((message, index) => {
        const showDateSeparator = lastDate !== formatDate(message.date);
        const showTimestamp = shouldShowTimestamp(message.date, lastTimestamp);

        if (showDateSeparator) {
          lastDate = formatDate(message.date);
        }

        if (showTimestamp) {
          lastTimestamp = message.date;
        }

        const isCurrentUser = message.senderId === currentUser.uid;
        const isSelected = message.id === selectedMessageId;
        const isHovered = hoveredMessageId === message.id;

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
              className={`relative flex flex-col text-sm ${
                isCurrentUser ? "items-end" : "items-start"
              }`}
              onMouseEnter={() => setHoveredMessageId(message.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
            >
              <div
                className={`relative max-w-[70%] rounded-2xl px-3 py-2 md:py-1 pb-3 md:pb-3 cursor-pointer ${
                  isCurrentUser
                    ? "bg-blue-500 text-white"
                    : "bg-[#f2f2f2] text-black"
                }`}
                onClick={() => handleMessageClick(message.id)}
              >
                <p className="break-word-mt text-start mb-1">
                  {isCurrentUser ? message.text : message.translatedText}
                </p>
                {message.translatedText &&
                  message.translatedText !== message.text && (
                    <div
                      className={`relative items-center rounded-md p-0.5 px-2 ${
                        isCurrentUser
                          ? "right-0 bg-blue-400"
                          : "left-0 bg-[#0000000d]"
                      }`}
                    >
                      <div className="text-start">{message.translatedText}</div>
                    </div>
                  )}
              </div>
              {isHovered && (
                <div
                  className={`absolute ${
                    isCurrentUser ? "left-0" : "right-0"
                  } top-0 flex space-x-2`}
                >
                  <button
                    className="p-1 bg-none rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => handleSelectIcon(message.id)}
                  >
                    <SmilePlus size={16} />
                  </button>
                  <button
                    className="p-1 bg-none rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => handleMessageMenu(message.id)}
                  >
                    <EllipsisVertical size={16} />
                  </button>
                </div>
              )}
              {isSelected && (
                <span
                  className={`text-xs mt-1 ${
                    isCurrentUser ? "text-right" : "text-left"
                  }`}
                >
                  Translated from {message.detectedLanguage} •{" "}
                  {formatTime(message.date)}
                </span>
              )}
            </div>
          </React.Fragment>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageList;
