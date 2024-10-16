// Header.jsx
import { useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";

const createHashtagFromDisplayName = (displayName) => {
  if (!displayName) return "";

  const vietnameseToEnglishMap = {
    á: "a",
    à: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    // ... (giữ nguyên phần còn lại của map)
  };

  const replaceVietnameseCharacters = (str) => {
    return str
      .split("")
      .map((char) => vietnameseToEnglishMap[char] || char)
      .join("");
  };

  const [username] = displayName.split(" ").map(replaceVietnameseCharacters);
  return username.toLowerCase();
};

const Header = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex w-full items-center border-b px-1 pt-2.5 pb-1 md:px-3">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex items-center gap-2 active:opacity-30 md:cursor-pointer">
          <div className="relative">
            <div
              className="border-1 relative aspect-square shrink-0 overflow-hidden rounded-full border border-neutral-50 dark:border-neutral-800"
              style={{ width: "36px", height: "36px" }}
            >
              {data.user?.photoURL ? (
                <img
                  alt={data.user?.displayName}
                  src={data.user?.photoURL}
                  className="object-cover absolute inset-0 h-full w-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-gray-300 text-gray-600">
                  {data.user?.displayName?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 z-50 h-3.5 w-3.5 rounded-full bg-white p-[2px] dark:bg-neutral-950">
              <div className="h-full w-full rounded-full bg-[#51c878]"></div>
            </div>
          </div>
          <div>
            <p className="break-word-mt line-clamp-1 font-medium">
              {data.user?.displayName || "Unknown User"}
            </p>
            <p className="line-clamp-1 text-sm font-light">
              @{createHashtagFromDisplayName(data.user?.displayName)}
            </p>
          </div>
        </div>
      </div>
      <div className="ml-auto mr-1 flex items-center gap-1">
        <button className="flex items-center justify-center focus:outline-none transition-all rounded-full bg-transparent text-primary md:hover:bg-blue-200 p-0 shrink-0 md:w-9 md:h-9 w-11 h-11">
          <span className="material-symbols-outlined">call</span>
        </button>
        <button className="flex items-center justify-center focus:outline-none transition-all rounded-full bg-transparent text-primary md:hover:bg-blue-200 p-0 shrink-0 md:w-9 md:h-9 w-11 h-11">
          <span className="material-symbols-outlined">search</span>
        </button>
        <button className="flex items-center justify-center focus:outline-none transition-all rounded-full bg-transparent text-primary md:hover:bg-blue-200 p-0 shrink-0 md:w-9 md:h-9 w-11 h-11">
          <span className="material-symbols-outlined">info</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
