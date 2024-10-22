import { useState } from "react";
import SettingsMenu from "./ActionsButton/SettingsMenu";
import PropTypes from "prop-types";

import EditSquare from "../../../assets/conversation/edit_square.svg";
import AddCall from "../../../assets/conversation/add_call.svg";
import MoreVert from "../../../assets/conversation/more_vert.svg";

const ActionButton = ({ onNewConversation, onNewCall }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const buttonClassName =
    "inline-flex items-center justify-center focus:outline-none transition-all bg-neutral-100 hover:bg-neutral-200 rounded-full relative p-0 md:w-9 md:h-9 w-11 h-11";

  return (
    <div>
      <div className="flex gap-3">
        <button
          onClick={onNewConversation}
          className={buttonClassName}
          aria-label="New Conversation"
        >
          <img src={EditSquare} alt="action-icon" className="inline-block" />
        </button>

        <button
          onClick={onNewCall}
          className={buttonClassName}
          aria-label="New Call"
        >
          <img src={AddCall} alt="action-icon" className="inline-block" />
        </button>

        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={buttonClassName}
          aria-label="Settings"
        >
          <img src={MoreVert} alt="action-icon" className="inline-block" />
        </button>
      </div>

      {isSettingsOpen && (
        <div className="absolute right-0 top-full mt-1 z-50">
          <SettingsMenu onClose={() => setIsSettingsOpen(false)} />
        </div>
      )}
    </div>
  );
};

ActionButton.propTypes = {
  onNewConversation: PropTypes.func.isRequired,
  onNewCall: PropTypes.func.isRequired,
};

export default ActionButton;
