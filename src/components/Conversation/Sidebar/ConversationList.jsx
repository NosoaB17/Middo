import { useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import PropTypes from "prop-types";

const ConversationItem = ({ conversation, isActive, onClick }) => {
  return (
    <div
      className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
        isActive ? "bg-gray-200" : ""
      }`}
      onClick={() => onClick(conversation)}
    >
      <div className="flex-shrink-0 mr-3">
        <img
          src={
            conversation.userInfo.photoURL || "https://via.placeholder.com/40"
          }
          alt={conversation.userInfo.displayName}
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {conversation.userInfo.displayName}
        </h3>
        <p className="text-sm text-gray-500 truncate">
          {conversation.lastMessage?.text}
        </p>
      </div>
      <div className="flex-shrink-0 ml-2">
        <span className="text-xs text-gray-400">
          {conversation.date &&
            new Date(conversation.date.toDate()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </span>
      </div>
    </div>
  );
};

ConversationItem.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userInfo: PropTypes.shape({
      photoURL: PropTypes.string,
      displayName: PropTypes.string.isRequired,
    }).isRequired,
    lastMessage: PropTypes.shape({
      text: PropTypes.string,
    }),
    date: PropTypes.object,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ConversationList = ({ activeTab }) => {
  const { data, dispatch } = useContext(ChatContext);

  const handleSelectConversation = (conversation) => {
    dispatch({ type: "CHANGE_USER", payload: conversation.userInfo });
  };

  // Filter conversations based on activeTab if needed
  const filteredConversations = data.conversations.filter((conversation) => {
    if (activeTab === "all") return true;
    // Add more filtering logic based on your tabs
    return false;
  });

  return (
    <div className="h-full overflow-y-auto">
      {filteredConversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={data.chatId === conversation.id}
          onClick={handleSelectConversation}
        />
      ))}
    </div>
  );
};

ConversationList.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default ConversationList;
