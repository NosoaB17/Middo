import { useContext } from "react";
import { SmilePlus } from "lucide-react";
import MessageMenu from "./MessageMenu";
import MessageReplyInfo from "./MessageReplyInfo";
import { ChatContext } from "../../../../contexts/ChatContext";
import FileAttachment from "./FileAttachment";
import { useSearchMessages } from "../../../../hooks/useSearchMessages";

const MessageItem = ({
  message,
  isCurrentUser,
  isRemoved,
  isHovered,
  isSelected,
  isSearchResult,
  isActiveSearchResult,
  searchQuery,
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

  const highlightSearchText = (text, query) => {
    if (!query || !isSearchResult) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span
              key={i}
              className={`bg-yellow-200 ${
                isActiveSearchResult ? "bg-yellow-400" : ""
              }`}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div
      className={`relative flex flex-col text-sm ${
        isCurrentUser ? "items-end" : "items-start"
      } ${isSearchResult ? "scroll-mt-4" : ""} ${
        isActiveSearchResult ? "bg-blue-50/10 rounded-lg" : ""
      }`}
      ref={isActiveSearchResult ? scrollRef : null}
      id={`message-${message.id}`}
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
          {message.type === "file" ? (
            <FileAttachment fileData={message.fileData} />
          ) : (
            <div
              className={`relative max-w-[60%] rounded-2xl px-3 py-2 md:py-1 pb-3 md:pb-3 cursor-pointer ${
                isCurrentUser
                  ? "bg-blue-500 text-white"
                  : "bg-[#f2f2f2] text-black"
              }`}
              onClick={() => onMessageClick(message.id)}
            >
              <p className="break-word-mt text-start mb-1">
                {highlightSearchText(
                  isCurrentUser
                    ? message.text
                    : message.translatedText || message.text,
                  searchQuery
                )}
                {isCurrentUser
                  ? message.text
                  : message.translatedText || message.text}
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
                    <p className="text-start">
                      {isCurrentUser ? message.translatedText : message.text}
                    </p>
                  </div>
                )}
            </div>
          )}
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
