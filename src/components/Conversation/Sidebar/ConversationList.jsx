import React from "react";

const ConversationItem = ({ avatar, name, lastMessage, time }) => (
  <div className="group flex bg-primary-200 flex-col">
    <div className="flex w-full items-center gap-2">
      <div className="relative">
        <div class="overflow-hidden shrink-0 relative aspect-square size-12 rounded-full border border-neutral-50 dark:border-neutral-800">
          <img
            src={avatar}
            className="absolute h-full w-full text-transparent"
            alt={name}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="max-w-full">
            <span className="line-clamp-1 break-all text-base font-semibold ">
              {name}
            </span>
          </div>
        </div>
        <span class="highlight-able line-clamp-1 break-all text-sm ">
          {lastMessage}
        </span>
      </div>
      <div className="relative">
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </div>
  </div>
);

const ConversationList = ({ activeTab, conversations, contacts }) => {
  const items = activeTab === "contacts" ? contacts : conversations;

  return (
    <>
      {items.map((item) => (
        <ConversationItem key={item.id} {...item} />
      ))}
    </>
  );
};

export default ConversationList;
