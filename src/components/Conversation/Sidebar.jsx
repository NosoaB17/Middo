import React, { useState } from "react";
import SearchBar from "./Sidebar/SearchBar";
import Tabs from "./Sidebar/Tabs";
import ConversationList from "./Sidebar/ConversationList";
import ActionsButton from "./Sidebar/ActionsButton";
import NewConversationModal from "./Sidebar/NewConversationModal";
import NewCallModal from "./Sidebar/NewCallModal";

const Sidebar = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const conversations = [
    {
      id: 1,
      avatar:
        "https://plus.unsplash.com/premium_photo-1675865396004-c7b86406affe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlldG5hbXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Dudaji VN",
      lastMessage:
        "I'm done: processing messages with middo bot extension, pro...",
      time: "5:59 PM",
    },
    {
      id: 2,
      avatar:
        "https://plus.unsplash.com/premium_photo-1675865396004-c7b86406affe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlldG5hbXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Dudaji All",
      lastMessage:
        "There was a problem with middo translation due to network...",
      time: "8:05 AM",
    },
  ];

  const contacts = [
    {
      id: 1,
      avatar:
        "https://plus.unsplash.com/premium_photo-1675865396004-c7b86406affe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlldG5hbXxlbnwwfHwwfHx8MA%3D%3D",
      name: "shhong",
      lastMessage: "@sipqko",
      time: "",
    },
    {
      id: 2,
      avatar:
        "https://plus.unsplash.com/premium_photo-1675865396004-c7b86406affe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlldG5hbXxlbnwwfHwwfHx8MA%3D%3D",
      name: "BaoSon",
      lastMessage: "",
      time: "",
    },
  ];

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
                conversations={conversations}
                contacts={contacts}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
