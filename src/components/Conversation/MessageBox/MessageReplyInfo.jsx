import { MessageSquare } from "lucide-react";

const MessageReplyInfo = ({
  replyCount,
  repliers,
  isCurrentUser,
  messageId,
  onOpenDiscussion,
}) => {
  // Sử dụng repliers từ message data
  const displayedRepliers = repliers?.slice(0, 2) || [];

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onOpenDiscussion(messageId);
      }}
      className={`relative flex items-center gap-1 px-1 py-1 bg-white rounded-lg shadow-sm 
        -bottom-3 group hover:shadow-md transition-all duration-200
        border border-gray-100 hover:border-gray-200
        ${isCurrentUser ? "left-0" : "right-0"}
        hover:scale-105 active:scale-100
        cursor-pointer`}
    >
      {/* Icon Discussion - Hiển thị khi hover */}
      <MessageSquare
        size={14}
        className="text-blue-500 hidden group-hover:inline-block"
      />

      {/* Avatar Stack */}
      <div className="flex items-center">
        {displayedRepliers.map((replier, index) => (
          <div
            key={replier.uid}
            className={`relative rounded-full border-2 border-white 
              ${index !== 0 ? "-ml-2" : ""}
              transition-transform group-hover:translate-x-0
              ${
                index === 0
                  ? "group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
              }
            `}
            style={{ width: "20px", height: "20px" }}
          >
            {replier.photoURL ? (
              <img
                src={replier.photoURL}
                alt={replier.displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full rounded-full bg-gray-300 
                flex items-center justify-center text-xs font-medium text-gray-600"
              >
                {replier.displayName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reply Count */}
      <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
        {replyCount} {replyCount === 1 ? "reply" : "replies"}
      </span>
    </button>
  );
};

export default MessageReplyInfo;
