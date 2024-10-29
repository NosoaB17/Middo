import { Clock } from "lucide-react";

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

export default DiscussionMessage;
