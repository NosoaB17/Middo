import { useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";

// Hàm helper để định dạng thời gian
const formatTime = (date) => {
  if (!date) return "";
  const now = new Date();
  const messageDate = date.toDate();

  if (now.toDateString() === messageDate.toDateString()) {
    // Nếu là cùng ngày, hiển thị giờ
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    // Nếu khác ngày, hiển thị ngày tháng
    return messageDate.toLocaleDateString();
  }
};

const ConversationList = () => {
  const { data, dispatch } = useContext(ChatContext);

  const handleSelect = (conversation) => {
    dispatch({
      type: "CHANGE_USER",
      payload: {
        uid: conversation.userInfo.uid,
        displayName: conversation.userInfo.displayName,
        photoURL: conversation.userInfo.photoURL,
        chatId: conversation.id,
      },
    });
  };

  return (
    <div className="overflow-y-auto">
      {data.conversations.map((conv) => (
        <div
          key={conv.id}
          className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
            data.chatId === conv.id ? "bg-blue-100" : ""
          }`}
          onClick={() => handleSelect(conv)}
        >
          <img
            src={conv.userInfo.photoURL}
            alt={conv.userInfo.displayName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-grow min-w-0">
            <h3 className="font-semibold text-sm truncate">
              {conv.userInfo.displayName}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {conv.lastMessage?.text || "No messages yet"}
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="text-xs text-gray-400">
              {formatTime(conv.date)}
            </span>
            {/* Có thể thêm chỉ báo tin nhắn chưa đọc ở đây nếu cần */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
