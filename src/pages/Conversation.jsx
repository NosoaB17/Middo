import { useContext } from "react";
import Sidebar from "../components/Conversation/Sidebar";
import Chat from "../components/Conversation/Chat";
import { ChatContext } from "../contexts/ChatContext";

const Conversation = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex h-[calc(100vh-60px)]">
      <div className="w-1/4 border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="w-3/4">
        <Chat currentConversation={data.user} />
      </div>
    </div>
  );
};

export default Conversation;
