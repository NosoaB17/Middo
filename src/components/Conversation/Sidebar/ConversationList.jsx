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

  return (
    <div className="h-full overflow-y-auto">
      {data.conversations.map((conv) => (
        <div
          key={conv.id}
          className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
            data.chatId === conv.id ? "bg-blue-100" : ""
          }`}
          onClick={() => handleSelect(conv)}
        >
          <div className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center">
            {conv.userInfo.uid.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold">
              User {conv.userInfo.uid.slice(0, 5)}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {conv.lastMessage?.text || "No messages yet"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
