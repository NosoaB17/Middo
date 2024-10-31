import { X, MessageSquare } from "lucide-react";
import { useDiscussion } from "../../../../contexts/DiscussionContext";
import ReplyList from "./ReplyList";
import DiscussionInput from "./DiscussionInput";
import DiscussionMessage from "./DiscussionMessage";

const DiscussionContent = ({ onClose }) => {
  const { data } = useDiscussion();
  const { originMessage, replies } = data;

  return (
    <div className="my-0 w-5/12 bg-white border-l border-gray-200 h-full flex flex-col">
      <div className="flex h-[51px] items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <MessageSquare size={20} className="text-blue-500" />
          <span className="text-base font-medium text-gray-800">
            Discussion ({replies.length})
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Close discussion"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>
      <div className="relative overflow-hidden flex h-full flex-1 flex-col">
        <div className="flex flex-1 flex-col overflow-y-scroll custom-scrollbar">
          {originMessage && <DiscussionMessage message={originMessage} />}
          <div className="my-0.5 flex items-center justify-center gap-3">
            <div className="h-[1px] flex-1 bg-neutral-100"></div>
            <div className="flex items-center justify-center">
              <span className="text-xs font-light text-neutral-500">
                {replies.length} replies
              </span>
            </div>
            <div className="h-[1px] flex-1 bg-neutral-100"></div>
          </div>
          <ReplyList />
        </div>
        <DiscussionInput />
      </div>
    </div>
  );
};

export default DiscussionContent;
