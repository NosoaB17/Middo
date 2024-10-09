import { useState, useContext } from "react";
import SearchBar from "./Sidebar/SearchBar";
import Tabs from "./Sidebar/Tabs";
import ConversationList from "./Sidebar/ConversationList";
import ActionsButton from "./Sidebar/ActionsButton";
import NewConversationModal from "./Sidebar/ActionsButton/NewConversationModal";
import NewCallModal from "./Sidebar/ActionsButton/NewCallModal";
import { ChatContext } from "../../contexts/ChatContext";

const Sidebar = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const { data } = useContext(ChatContext);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {activeModal === "newConversation" && (
        <NewConversationModal onClose={closeModal} />
      )}
      {activeModal === "newCall" && <NewCallModal onClose={closeModal} />}
      {!activeModal && (
        <>
          <div className="w-full bg-background px-3 pt-3">
            <div className="mb-3 flex items-center justify-between">
              <h6 className="scroll-m-20 text-[18px] font-semibold tracking-tight">
                Conversation
              </h6>
              <ActionsButton
                onNewConversation={() => openModal("newConversation")}
                onNewCall={() => openModal("newCall")}
              />
            </div>
            <div className="flex items-center gap-1">
              <SearchBar />
            </div>
          </div>
          <div className="flex h-full flex-1 flex-col overflow-hidden">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="relative flex flex-col">
              <ConversationList
                activeTab={activeTab}
                conversations={data.conversations}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
