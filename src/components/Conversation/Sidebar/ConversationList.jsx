import { useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";

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
    <div className="h-full overflow-y-auto">
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
          <div>
            <h3 className="font-semibold">{conv.userInfo.displayName}</h3>
            <p className="text-sm text-gray-500 truncate">
              {conv.lastMessage?.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
