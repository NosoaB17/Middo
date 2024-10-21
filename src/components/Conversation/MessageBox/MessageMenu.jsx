import { useState, useRef, useEffect } from "react";
import {
  Eye,
  Copy,
  MessageSquare,
  Forward,
  Pin,
  Trash,
  MoreVertical,
} from "lucide-react";

const MessageMenu = ({
  messageId,
  onRemove,
  position,
  onReplyInDiscussion,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemove = () => {
    onRemove(messageId);
    setIsOpen(false);
  };

  const handleReplyInDiscussion = () => {
    onReplyInDiscussion(messageId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="p-1 rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical size={18} />
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-10 bg-white rounded-lg shadow-lg py-2 w-48 ${
            position === "left" ? "left-0" : "right-0"
          }`}
        >
          <MenuItem icon={<Eye size={16} />} text="View original" />
          <MenuItem icon={<Copy size={16} />} text="Copy" />
          <MenuItem icon={<Copy size={16} />} text="Copy E.S.L" />
          <MenuItem icon={<Copy size={16} />} text="Copy original" />
          <MenuItem
            icon={<MessageSquare size={16} />}
            text="Reply in Discussion"
            onClick={handleReplyInDiscussion}
          />
          <MenuItem icon={<Forward size={16} />} text="Forward" />
          <MenuItem icon={<Pin size={16} />} text="Pin" />
          <MenuItem
            icon={<Trash size={16} />}
            text="Remove"
            onClick={handleRemove}
            className="text-red-500"
          />
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, text, onClick, className = "" }) => (
  <div
    className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${className}`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

export default MessageMenu;
