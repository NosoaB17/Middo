import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

const Discussion = ({ messageId, onClose }) => {
  const discussionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        discussionRef.current &&
        !discussionRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={discussionRef}
      className="w-1/3 bg-white border-l border-gray-200 h-full flex flex-col"
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Discussion</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close discussion"
        >
          <X size={24} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <p>Discussion content for message ID: {messageId}</p>
      </div>
      <div className="border-t p-4">
        <input
          type="text"
          placeholder="Type a reply..."
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default Discussion;
