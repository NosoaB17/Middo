import { useEffect, useRef } from "react";
import { useSearchMessages } from "../../../../hooks/useSearchMessages";

const SearchMessageModal = ({ onClose }) => {
  const {
    searchQuery,
    selectedIndex,
    isSearching,
    searchResults,
    handleSearch,
    navigateResults,
    clearSearch,
  } = useSearchMessages();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      navigateResults("up");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      navigateResults("down");
    }
  };

  return (
    <div className="flex flex-col gap-3 border-b p-3">
      <div className="flex items-center gap-3">
        <div className="relative w-full overflow-hidden rounded-xl border transition-all">
          <div className="flex h-11 pl-1 transition-all">
            <input
              ref={inputRef}
              placeholder="Search messages"
              className="w-full border-0 bg-inherit p-2 focus:outline-none flex-1"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex h-11 w-11 items-center">
              <button
                className={`flex aspect-square h-full items-center justify-center p-2 text-primary ${
                  isSearching ? "opacity-50" : "opacity-100"
                }`}
                disabled={isSearching}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search w-5 h-5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="shrink-0 items-center gap-2 md:flex">
          <button
            type="button"
            className={`inline-flex items-center justify-center focus:outline-none bg-neutral-50 text-neutral-700 rounded-full p-0 shrink-0 md:w-9 md:h-9 w-11 h-11 ${
              selectedIndex <= 0 ? "opacity-50" : "hover:bg-neutral-100"
            }`}
            onClick={() => navigateResults("up")}
            disabled={selectedIndex <= 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-up inline-block w-5 h-5"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
          <div className="hover:opacity-80">
            <span className="text-base">
              {searchResults.length > 0
                ? `${selectedIndex + 1} of ${searchResults.length}`
                : "0 result"}
            </span>
          </div>
          <button
            type="button"
            className={`inline-flex items-center justify-center focus:outline-none bg-neutral-50 text-neutral-700 rounded-full p-0 shrink-0 md:w-9 md:h-9 w-11 h-11 ${
              selectedIndex >= searchResults.length - 1
                ? "opacity-50"
                : "hover:bg-neutral-100"
            }`}
            onClick={() => navigateResults("down")}
            disabled={selectedIndex >= searchResults.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down inline-block w-5 h-5"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center focus:outline-none transition-all font-medium bg-neutral-50 text-neutral-700 md:hover:bg-neutral-100 py-2 px-3 rounded-xl"
          onClick={() => {
            clearSearch();
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchMessageModal;
