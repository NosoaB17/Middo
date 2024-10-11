import { useState } from "react";
import SettingsMenu from "./ActionsButton/SettingsMenu";
import PropTypes from "prop-types";

const TooltipButton = ({ icon, title, onClick }) => {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center focus:outline-none transition-all bg-neutral-100 group-hover:bg-neutral-200 rounded-full relative p-0 shrink-0 md:w-9 md:h-9 w-11 h-11"
      >
        <span className="material-symbols-outlined inline-block ">{icon}</span>
      </button>
      <div className="absolute top-full left-1/2 transform-translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {title}
      </div>
    </div>
  );
};

const ActionsButton = ({ onNewConversation, onNewCall }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <div>
      <div className="flex gap-3">
        <TooltipButton
          icon="edit_square"
          title="New Conversation"
          onClick={onNewConversation}
        />
        <TooltipButton icon="add_call" title="New Call" onClick={onNewCall} />
        <TooltipButton
          icon="more_vert"
          title="Settings"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        />
      </div>
      {isSettingsOpen && (
        <div className="absolute right-0 top-full mt-1 z-50">
          <SettingsMenu onClose={() => setIsSettingsOpen(false)} />
        </div>
      )}
    </div>
  );
};

TooltipButton.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ActionsButton.propTypes = {
  onNewConversation: PropTypes.func.isRequired,
  onNewCall: PropTypes.func.isRequired,
};

export default ActionsButton;
