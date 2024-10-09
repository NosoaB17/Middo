import React from "react";

const NewCallModal = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex h-[53px] items-center gap-2 px-3">
        <button
          onClick={onClose}
          className="flex items-center justify-center focus:outline-none transition-all rounded-full bg-transparent md:hover:bg-[#f2f2f2] shrink-0 md:w-9 md:h-9 w-11 h-11"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-base font-semibold text-[#333]">New Call</h2>
      </div>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-card shadow-sm">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex w-full flex-1 flex-col overflow-y-auto px-2 pt-2">
            <div class="flex items-center justify-between px-3 pb-2">
              <h5 class="text-text scroll-m-20 tracking-tight text-base font-normal opacity-60">
                Suggestion
              </h5>
            </div>
            <div className="relative flex flex-col">
              <div className="group flex bg-primary-200">
                <div className="relative flex flex-1 cursor-pointer items-center justify-between px-3 py-2 transition-all">
                  <a className="flex w-full items-center gap-3">
                    <div className="relative">
                      <div className="border-1 relative aspect-square h-12 shrink-0 overflow-hidden rounded-full border border-neutral-50">
                        <div className="overflow-hidden shrink-0 aspect-square size-12 rounded-none border border-neutral-50 absolute ring-background w-12 h-12 ring-0 top-0 left-0 border-none">
                          <img
                            src="https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                            className="absolute h-full w-full text-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex-1 overflow-hidden">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex w-full max-w-full flex-row items-center gap-2">
                          <span className="font-normal">
                            Username/Group's name
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-text/50">
                          @Username/member's group
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="flex h-full shrink-0 items-center pr-3">
                  <button
                    type="button"
                    className="flex items-center justify-center transition-all fbg-primary md:hover:bg-primary-600 rounded-full p-0 shrink-0 md:w-9 md:h-9 w-11 h-11 bg-blue-500 text-white leading-6"
                  >
                    <span className="material-symbols-outlined inline-block">
                      phone_in_talk
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 mt-auto border-t border-neutral-50"></div>
        </div>
      </div>
    </div>
  );
};

export default NewCallModal;
