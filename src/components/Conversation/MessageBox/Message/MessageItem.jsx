import { useContext, useRef, useEffect } from "react";
import MessageMenu from "./MessageMenu";
import MessageReplyInfo from "./MessageReplyInfo";
import { ChatContext } from "../../../../contexts/ChatContext";
import FileAttachment from "./FileAttachment";

const MessageAvatar = ({ photoURL }) => (
  <div className="absolute justify-start">
    <img
      src={photoURL || "/default-avatar.png"}
      alt="avatar"
      className="w-6 h-6 rounded-full object-cover"
    />
  </div>
);

const MessageContent = ({ message, isCurrentUser, onClick }) => (
  <div
    className={`relative max-w-[60%] rounded-2xl px-3 py-2 md:py-1 pb-3 md:pb-3 cursor-pointer ml-8 ${
      isCurrentUser ? "bg-blue-500 text-white" : "bg-[#f2f2f2] text-black"
    }`}
    onClick={onClick}
  >
    <p className="break-word-mt text-start mb-1">
      {isCurrentUser ? message.text : message.translatedText || message.text}
    </p>
    {message.translatedText && message.translatedText !== message.text && (
      <div
        className={`relative items-center rounded-md p-0.5 px-2 ${
          isCurrentUser ? "right-0 bg-blue-400" : "left-0 bg-[#e6e6e6]"
        }`}
      >
        <p className="text-start">
          {isCurrentUser ? message.translatedText : message.text}
        </p>
      </div>
    )}
  </div>
);

const MessageActions = ({
  isCurrentUser,
  messageId,
  onRemove,
  onReplyInDiscussion,
  onSelectIcon,
}) => (
  <div
    className={`absolute flex ${
      isCurrentUser ? "right-0 mr-[60%]" : "left-0 ml-[60%]"
    }`}
  >
    <MessageMenu
      messageId={messageId}
      onRemove={onRemove}
      onReplyInDiscussion={onReplyInDiscussion}
      onSelectIcon={onSelectIcon}
      position={isCurrentUser ? "left" : "right"}
    />
  </div>
);

const MessageItem = ({
  message,
  isCurrentUser,
  isRemoved,
  isHovered,
  isSelected,
  onMessageClick,
  onSelectIcon,
  onRemove,
  onReplyInDiscussion,
  formatTime,
  replyCount,
  repliers,
}) => {
  const { data } = useContext(ChatContext);
  const scrollRef = useRef(null);

  return (
    <div
      className={`relative flex flex-col text-sm ${
        isCurrentUser ? "items-end" : "items-start"
      }`}
      ref={scrollRef}
      id={`message-${message.id}`}
    >
      {!isCurrentUser && (
        <MessageAvatar photoURL={data?.user?.photoURL} isCurrentUser={false} />
      )}

      {isRemoved ? (
        <div className="px-3 py-2 md:py-1 bg-primary !bg-transparent me">
          <div className="break-word-mt text-start text-base md:text-sm ml-8 text-neutral-400">
            Removed a message
          </div>
        </div>
      ) : (
        <>
          {message.type === "file" ? (
            <FileAttachment fileData={message.fileData} />
          ) : (
            <MessageContent
              message={message}
              isCurrentUser={isCurrentUser}
              onClick={() => onMessageClick(message.id)}
            />
          )}
          {isHovered && (
            <MessageActions
              isCurrentUser={isCurrentUser}
              messageId={message.id}
              onRemove={onRemove}
              onReplyInDiscussion={onReplyInDiscussion}
              onSelectIcon={onSelectIcon}
            />
          )}
        </>
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

      {replyCount > 0 && (
        <MessageReplyInfo
          replyCount={replyCount}
          repliers={repliers}
          isCurrentUser={isCurrentUser}
          messageId={message.id}
          onOpenDiscussion={onReplyInDiscussion}
        />
      )}
    </div>
  );
};

export default MessageItem;
