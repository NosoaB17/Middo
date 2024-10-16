import { useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";

const ConversationList = () => {
  const { data, dispatch } = useContext(ChatContext);

  const handleSelect = (conversation) => {
    dispatch({
      type: "CHANGE_USER",
      payload: conversation.userInfo,
    });
  };

  // Hàm để định dạng ngày giờ
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {data.conversations.map((conv) => (
        <div
          key={conv.id}
          className={`relative flex cursor-pointer items-center px-3 py-2 transition-all hover:bg-neutral-100 ${
            data.chatId === conv.id ? "bg-blue-100" : ""
          }`}
          onClick={() => handleSelect(conv)}
        >
          <div className="w-12 h-12 flex-shrink-0 rounded-full mr-3 overflow-hidden">
            <img
              src={conv.userInfo.photoURL}
              alt={conv.userInfo.displayName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-baseline">
              <span className="font-normal truncate mr-2">
                {conv.userInfo.displayName || "Unknown User"}
              </span>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {formatDate(conv.date)}
              </span>
            </div>
            <p className="text-sm truncate text-gray-700 opacity-80">
              {conv.lastMessage?.text || "No messages yet"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
