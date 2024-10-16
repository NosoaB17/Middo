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
    <div className="h-[calc(100dvh_-_52px)] relative flex w-full flex-col overflow-hidden border-r">
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
          <div className="relative flex flex-1 flex-col overflow-hidden">
            <div className="relative flex w-full flex-1 flex-col overflow-hidden bg-background">
              <div className="w-full">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
              <div className="relative h-full w-full flex-1 overflow-hidden">
                <ConversationList
                  activeTab={activeTab}
                  conversations={data.conversations}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
