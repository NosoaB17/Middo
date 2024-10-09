import React from "react";

const NewConversationModal = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex h-[53px] items-center gap-2 px-3">
        <button
          onClick={onClose}
          className="flex items-center justify-center focus:outline-none transition-all rounded-full bg-transparent md:hover:bg-[#f2f2f2] shrink-0 md:w-9 md:h-9 w-11 h-11"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-base font-semibold text-[#333]">
          New Conversation
        </h2>
      </div>
      <div className="mt-2 flex items-center gap-2 space-y-1 border-b px-5 pb-5">
        <span class="text-base color-[#333]">To: </span>
        <div className="relative w-full overflow-hidden rounded-xl border bg-background transition-all">
          <div className="flex h-11 pl-1 transition-all">
            <input
              className="w-full border-0 bg-inherit p-2 ring-0 focus:outline-none dark:text-neutral-50 flex-1"
              placeholder="Search for people or groups"
              type="text"
              value=""
            />
            <div className="flex h-11 w-11 items-center bg-inherit ">
              <button className="flex aspect-square h-full items-center justify-center p-2 text-primary">
                <span class="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <button
          type="button"
          className="flex items-center justify-center focus:outline-none font-medium text-neutral-50 bg-blue-500 md:hover:bg-blue-600  py-3 px-5 rounded-xl w-full"
        >
          <span class="material-symbols-outlined mr-3 h-5 w-5">group</span>
          Create group chat
        </button>
      </div>
      <div className="flex w-full flex-1 flex-col overflow-y-auto px-2">
        <div className="flex items-center justify-between px-3 pb-2">
          <h5 class="scroll-m-20 tracking-tight text-base font-normal opacity-60">
            Suggestion
          </h5>
        </div>
        <div>
          <a href="https://fonts.google.com/icons?selected=Material+Symbols+Outlined:group:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=group+&icon.size=24&icon.color=%234d4d4d&icon.platform=web&icon.set=Material+Symbols">
            <div className="flex cursor-pointer flex-col items-center justify-between px-3 py-2 transition-all bg-transparent hover:bg-background-lighter dark:hover:bg-primary-900">
              <div className="flex w-full items-center gap-2">
                <div className="relative">
                  {" "}
                  <div class="overflow-hidden shrink-0 relative aspect-square size-12 rounded-full border border-neutral-50 dark:border-neutral-800">
                    <img
                      src="https://lh3.googleusercontent.com/a/ACg8ocIo8ZGzIcaA2_dyzYhoEvmHIRpealTVG1t6WooUNG0VVP8U93g=s96-c"
                      className="absolute h-full w-full text-transparent"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <div className="max-w-full">
                      <span className="line-clamp-1 break-all text-base font-semibold ">
                        qn14fc
                      </span>
                    </div>
                  </div>
                  <span class="highlight-able line-clamp-1 break-all text-sm ">
                    @qn14fc
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewConversationModal;
