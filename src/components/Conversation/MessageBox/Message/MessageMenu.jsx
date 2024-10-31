import { useState, useRef, useEffect } from "react";
import { MessageSquare, Trash, MoreVertical, SmilePlus } from "lucide-react";

const MenuButton = ({ icon: Icon, onClick, className = "" }) => (
  <div
    className={`p-1 bg-neutral-50 rounded-full shadow-md hover:bg-gray-100 cursor-pointer ${className}`}
    onClick={onClick}
  >
    <Icon size={18} />
  </div>
);

const MenuItem = ({ icon, text, onClick, className = "" }) => (
  <div
    className={`relative flex cursor-pointer select-none items-center px-3 outline-none transition-colors py-3 md:py-1 rounded-xl my-1 text-sm ${className}`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

const MessageMenu = ({
  messageId,
  onRemove,
  position,
  onReplyInDiscussion,
  onSelectIcon,
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

  const handleAction = (action) => {
    action(messageId);
    setIsOpen(false);
  };

  return (
    <div className="flex gap-2">
      {position === "right" && (
        <MenuButton
          icon={SmilePlus}
          onClick={() => handleAction(onSelectIcon)}
        />
      )}

      <div className="relative">
        <MenuButton icon={MoreVertical} onClick={() => setIsOpen(!isOpen)} />

        {isOpen && (
          <div
            ref={menuRef}
            className={`absolute bg-white shadow-lg py-2 w-48 z-50 min-w-[8rem] overflow-hidden border p-1 rounded-2xl ${
              position === "left" ? "left-0" : "right-0"
            }`}
          >
            <MenuItem
              icon={<MessageSquare size={16} />}
              text="Reply in Discussion"
              onClick={() => handleAction(onReplyInDiscussion)}
            />
            <MenuItem
              icon={<Trash size={16} />}
              text="Remove"
              onClick={() => handleAction(onRemove)}
              className="text-red-500"
            />
          </div>
        )}
      </div>

      {position === "left" && (
        <MenuButton
          icon={SmilePlus}
          onClick={() => handleAction(onSelectIcon)}
        />
      )}
    </div>
  );
};

export default MessageMenu;
