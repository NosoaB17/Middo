import React, { useState } from "react";
import Sidebar from "../components/Conversation/Sidebar";
import Chat from "../components/Conversation/Chat";

const Conversation = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  const handleSelectConversation = (conversation) => {
    setCurrentConversation(conversation);
  };

  return (
    <div className="flex h-[calc(100vh-60px)]">
      <div className="w-1/4 border-r border-gray-200">
        <Sidebar
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
        />
      </div>
      <div className="w-3/4">
        <Chat currentConversation={currentConversation} />
      </div>
    </div>
  );
};

export default Conversation;
