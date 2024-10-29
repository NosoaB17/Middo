import { useState, useContext } from "react";
import SearchBar from "./SearchBar";
import Tabs from "./Tabs";
import ConversationList from "./ConversationList";
import ActionsButton from "./ActionsButton";
import NewConversationModal from "./ActionsButton/NewConversationModal";
import NewCallModal from "./ActionsButton/NewCallModal";
import { ChatContext } from "../../../contexts/ChatContext";

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
    <div className="h-full flex flex-col overflow-hidden">
      {activeModal === "newConversation" && (
        <NewConversationModal onClose={closeModal} />
      )}
      {activeModal === "newCall" && <NewCallModal onClose={closeModal} />}
      {!activeModal && (
        <>
          <div className="px-3 pt-8  bg-background">
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
          <div className="flex-1 overflow-hidden">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="h-full overflow-y-auto">
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
