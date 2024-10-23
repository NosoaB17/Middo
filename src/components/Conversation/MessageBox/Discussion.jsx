import { X, MessageSquare, Clock } from "lucide-react";
import {
  DiscussionContextProvider,
  useDiscussion,
} from "../../../contexts/DiscussionContext";
import ReplyList from "./ReplyList";
import DiscussionInput from "./DiscussionInput";

const Discussion = ({ messageId, onClose }) => {
  return (
    <DiscussionContextProvider messageId={messageId}>
      <DiscussionContent onClose={onClose} />
    </DiscussionContextProvider>
  );
};

const DiscussionContent = ({ onClose }) => {
  const { data } = useDiscussion();
  const { originMessage, replies } = data;

  return (
    <div className="my-0 w-5/12 bg-white border-l border-gray-200 h-full flex flex-col">
      <div className="flex h-[51px] items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <MessageSquare size={20} className="text-blue-500" />
          <span className="text-base font-medium text-gray-800">
            Discussion ({replies.length})
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Close discussion"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      <div className="relative overflow-hidden flex h-full flex-1 flex-col">
        <div className="flex flex-1 flex-col overflow-y-scroll custom-scrollbar">
          {originMessage && <DiscussionMessage message={originMessage} />}
          <div className="my-0.5 flex items-center justify-center gap-3">
            <div className="h-[1px] flex-1 bg-neutral-100"></div>
            <div className="flex items-center justify-center">
              <span className="text-xs font-light text-neutral-500">
                {replies.length} replies
              </span>
            </div>
            <div className="h-[1px] flex-1 bg-neutral-100"></div>
          </div>
          <ReplyList />
        </div>
        <DiscussionInput />
      </div>
    </div>
  );
};

const DiscussionMessage = ({ message }) => {
  const formatTime = (date) => {
    if (!date) return "";
    return new Date(date.toDate()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex cursor-pointer flex-col p-3">
      <div className="flex items-center gap-2">
        <div className="overflow-hidden shrink-0 relative aspect-square size-6 rounded-full border border-neutral-50">
          {message.userInfo?.photoURL ? (
            <img
              src={message.userInfo.photoURL}
              alt={message.userInfo.displayName}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
              {message.userInfo?.displayName?.charAt(0).toUpperCase() || "?"}
            </div>
          )}
        </div>
        <span className="max-w-80 flex-1 overflow-hidden break-words text-sm font-semibold">
          {message.userInfo?.displayName || "Unknown User"}
        </span>
      </div>

      <div className="ml-2 mt-1">
        <div className="flex flex-col pl-6">
          <p className="text-sm">{message.text}</p>
          {message.translatedText &&
            message.translatedText !== message.text && (
              <div className="relative mt-2">
                <div className="rounded-xl bg-neutral-50 p-3 py-2 text-neutral-600 text-sm">
                  <p>{message.translatedText}</p>
                </div>
              </div>
            )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 pl-8 text-xs text-neutral-300">
        {message.detectedLanguage && (
          <>
            <span className="whitespace-nowrap">
              Translated from {message.detectedLanguage}
            </span>
            <span className="mx-1">•</span>
          </>
        )}
        <span className="flex items-center whitespace-nowrap text-xs">
          <Clock className="mr-1 inline-block size-3" />
          {formatTime(message.date)}
        </span>
      </div>
    </div>
  );
};

export default Discussion;
