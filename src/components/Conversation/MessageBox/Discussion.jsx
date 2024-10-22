import { X, MessageSquare } from "lucide-react";

const Discussion = ({ messageId, onClose }) => {
  return (
    <div className="w-5/12 bg-white border-l border-gray-200 h-full flex flex-col">
      <div className="flex h-[51px] items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <MessageSquare size={20} className="text-blue-500" />
          <span className="text-base font-medium text-gray-800">
            Discussion
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
      <div className="flex-1">
        <div className="flex cursor-pointer flex-col p-3">
          <div className="flex items-center p-2">
            <div className="overflow-hidden shrink-0 relative aspect-square size-6 rounded-full border border-neutral-50 ">
              <img
                src="https://plus.unsplash.com/premium_photo-1663839014860-382ee7152d43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
                alt="sample image"
              />
            </div>
            <span className="max-w-80 flex-1 overflow-hidden break-words text-sm font-semibold">
              Sơn Ngô
            </span>
          </div>
          <div className="ml-2 mt-1">
            <div className="flex flex-col pl-6">
              <p>Message Replied Show Here</p>
              <div className="relative mt-2">
                <div className="rounded-xl bg-neutral-50 p-3 py-2 text-neutral-600">
                  <p>ESL Message Replied Show Here</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 pl-8 text-xs text-neutral-300">
            <span className="whitespace-nowrap">
              Translated from Vietnamese
            </span>
            <span className="flex items-center whitespace-nowrap text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-clock9 mr-1 inline-block size-3"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 7.5 12"></polyline>
              </svg>
              Oct 21, 2024 5:22 PM
            </span>
          </div>
        </div>
        <div className="my-0.5 flex items-center justify-center gap-3"></div>
        <div className="flex flex-1 flex-col-reverse justify-end gap-2 p-3">
          <div className="flex items-center justify-center">
            <div className="bg-primary/30 h-[1px]"></div>
            <span className="text-xs font-light text-neutral-500 ">
              4 Replies
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
