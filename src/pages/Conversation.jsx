import Sidebar from "../components/Conversation/Sidebar";
import MessageBox from "../components/Conversation/MessageBox";

const Conversation = () => {
  return (
    <div className="flex h-[calc(100vh-60px)] overflow-hidden">
      <div className="w-1/4 border-r border-gray-200 pt-2">
        <Sidebar />
      </div>
      <div className="w-3/4">
        <MessageBox />
      </div>
    </div>
  );
};

export default Conversation;
