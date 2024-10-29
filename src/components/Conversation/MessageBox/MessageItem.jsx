import { useContext } from "react";
import { SmilePlus } from "lucide-react";
import MessageMenu from "./MessageMenu";
import MessageReplyInfo from "./MessageReplyInfo";
import { ChatContext } from "../../../contexts/ChatContext";
import FileAttachment from "./FileAttachment";

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

  const renderAvatar = (photoURL, isCurrentUser) => (
    <div className={` ${isCurrentUser ? "justify-end" : "justify-start"} mb-1`}>
      <img
        src={photoURL || "/default-avatar.png"}
        alt="avatar"
        className="w-6 h-6 rounded-full object-cover"
      />
    </div>
  );

  const renderContent = () => {
    if (message.type === "file") {
      return <FileAttachment fileData={message.fileData} />;
    }
  };

  return (
    <div
      className={`relative flex flex-col text-sm ${
        isCurrentUser ? "items-end" : "items-start"
      }`}
    >
      {isCurrentUser ? <></> : renderAvatar(data?.user?.photoURL, false)}
      {isRemoved ? (
        <div className="px-3 py-2 md:py-1 bg-primary !bg-transparent me">
          <div className="break-word-mt text-start text-base md:text-sm text-neutral-400">
            Removed a message
          </div>
        </div>
      ) : (
        <>
          <div
            className={`relative max-w-[60%] rounded-2xl px-3 py-2 md:py-1 pb-3 md:pb-3 cursor-pointer ${
              isCurrentUser
                ? "bg-blue-500 text-white"
                : "bg-[#f2f2f2] text-black"
            }`}
            onClick={() => onMessageClick(message.id)}
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
                      : "left-0 bg-[#e6e6e6]"
                  }`}
                >
                  <div className="text-start">{message.translatedText}</div>
                </div>
              )}
            {renderContent()}
          </div>
          {isHovered && (
            <div
              className={`absolute flex gap-2 ${
                isCurrentUser ? "right-0 mr-[60%]" : "left-0 ml-[60%]"
              }`}
            >
              {isCurrentUser ? (
                <>
                  <MessageMenu
                    messageId={message.id}
                    onRemove={onRemove}
                    onReplyInDiscussion={onReplyInDiscussion}
                    position="left"
                  />
                  <div
                    className="p-1 bg-neutral-50 rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => onSelectIcon(message.id)}
                  >
                    <SmilePlus size={18} />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="p-1 bg-neutral-50 rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => onSelectIcon(message.id)}
                  >
                    <SmilePlus size={18} />
                  </div>
                  <MessageMenu
                    messageId={message.id}
                    onRemove={onRemove}
                    onReplyInDiscussion={onReplyInDiscussion}
                    position="right"
                  />
                </>
              )}
            </div>
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
