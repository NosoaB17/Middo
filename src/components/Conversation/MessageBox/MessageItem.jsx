/* eslint-disable react/prop-types */
import { SmilePlus } from "lucide-react";
import MessageMenu from "./MessageMenu";

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
}) => (
  <div
    className={`relative flex flex-col text-sm ${
      isCurrentUser ? "items-end" : "items-start"
    }`}
  >
    {isRemoved ? (
      <div className="px-3 py-2 md:py-1 bg-primary !bg-transparent me">
        <div className="break-word-mt text-start text-base md:text-sm text-neutral-400">
          Removed a message
        </div>
      </div>
    ) : (
      <>
        <div
          className={`relative max-w-[50%] rounded-2xl px-3 py-2 md:py-1 pb-3 md:pb-3 cursor-pointer ${
            isCurrentUser ? "bg-blue-500 text-white" : "bg-[#f2f2f2] text-black"
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
                  isCurrentUser ? "right-0 bg-blue-400" : "left-0 bg-[#e6e6e6]"
                }`}
              >
                <div className="text-start">{message.translatedText}</div>
              </div>
            )}
        </div>
        {isHovered && (
          <div
            className={`absolute flex gap-2 ${
              isCurrentUser ? "right-0 mr-[50%]" : "left-0 ml-[50%]"
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
        className={`text-xs mt-1 ${isCurrentUser ? "text-right" : "text-left"}`}
      >
        Translated from {message.detectedLanguage} • {formatTime(message.date)}
      </span>
    )}
  </div>
);

export default MessageItem;
