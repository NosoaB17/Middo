import React, { useState } from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "all",
      label: "All",
      icon: <span class="material-symbols-outlined">forum</span>,
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: (
        <span class="material-symbols-outlined">perm_contact_calendar</span>
      ),
    },
    {
      id: "archive",
      label: "Archive",
      icon: <span class="material-symbols-outlined">inventory_2</span>,
    },
    {
      id: "waiting",
      label: "Waiting",
      icon: <span class="material-symbols-outlined">sms</span>,
    },
  ];

  return (
    <div className="w-full">
      <div className="group flex w-full items-center justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col w-full items-center justify-center border-transparent px-3 py-4 transition-all focus:outline-none `}
          >
            {activeTab === tab.id ? (
              <span className="text-base md:text-sm font-medium">
                {tab.label}
              </span>
            ) : (
              <span className="material-icons-outlined">{tab.icon}</span>
            )}
            {activeTab === tab.id && (
              <div className="relative h-1 w-full bg-primary bg-blue-500 mt-2" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
