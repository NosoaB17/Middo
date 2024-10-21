import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import MessageItem from "./MessageItem";

const MessageList = ({ onOpenDiscussion }) => {
  const { data, dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
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
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  const formatTime = (date) => {
    if (!date || typeof date.toDate !== "function") return "";
    return date
      .toDate()
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date) => {
    if (!date || typeof date.toDate !== "function") return "";
    return date.toDate().toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shouldShowTimestamp = (currentDate, previousDate) => {
    if (!currentDate || !previousDate) return true;
    const timeDiff =
      currentDate.toDate().getTime() - previousDate.toDate().getTime();
    return timeDiff >= 3600000; // 1 hour in milliseconds
  };

  const handleMessageClick = (messageId) => {
    setSelectedMessageId(messageId === selectedMessageId ? null : messageId);
  };

  const handleSelectIcon = (messageId) => {
    console.log("Select icon for message:", messageId);
  };

  const handleRemoveMessage = async (messageId) => {
    try {
      const messageRef = doc(db, "chats", data.chatId, "messages", messageId);
      await updateDoc(messageRef, {
        isRemoved: true,
        removedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error removing message:", error);
    }
  };

  const handleReplyInDiscussion = (messageId) => {
    onOpenDiscussion(messageId);
  };

  let lastDate = null;
  let lastTimestamp = null;

  return (
    <div className="relative bg-primary/5 flex w-full flex-1 flex-col gap-2.5 overflow-x-hidden overflow-y-scroll px-2 md:px-3">
      {data.messages.map((message) => {
        const showDateSeparator = lastDate !== formatDate(message.date);
        const showTimestamp = shouldShowTimestamp(message.date, lastTimestamp);

        if (showDateSeparator) {
          lastDate = formatDate(message.date);
        }

        if (showTimestamp) {
          lastTimestamp = message.date;
        }

        const isCurrentUser = message.senderId === currentUser.uid;
        const isRemoved = message.isRemoved;
        const isHovered = hoveredMessageId === message.id;
        const isSelected = selectedMessageId === message.id;

        return (
          <React.Fragment key={message.id}>
            {showDateSeparator && (
              <div className="my-3 flex items-center justify-center gap-3">
                <div className="flex items-center justify-center">
                  <div className="bg-primary/30 h-[1px] flex-grow"></div>
                  <span className="text-xs font-light text-neutral-500 px-2">
                    {lastDate}
                  </span>
                  <div className="bg-primary/30 h-[1px] flex-grow"></div>
                </div>
              </div>
            )}
            {showTimestamp && !showDateSeparator && (
              <div className="my-2 flex items-center justify-center">
                <span className="text-xs font-light text-neutral-500">
                  {formatTime(message.date)}
                </span>
              </div>
            )}
            <div
              onMouseEnter={() => setHoveredMessageId(message.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
            >
              <MessageItem
                message={message}
                isCurrentUser={isCurrentUser}
                isRemoved={isRemoved}
                isHovered={isHovered}
                isSelected={isSelected}
                onMessageClick={handleMessageClick}
                onSelectIcon={handleSelectIcon}
                onRemove={handleRemoveMessage}
                onReplyInDiscussion={handleReplyInDiscussion}
                formatTime={formatTime}
              />
            </div>
          </React.Fragment>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageList;
