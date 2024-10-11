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
    ấ: "a",
    ầ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    ă: "a",
    ắ: "a",
    ằ: "a",
    ẳ: "a",
    ẵ: "a",
    ặ: "a",
    í: "i",
    ì: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ó: "o",
    ò: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ố: "o",
    ồ: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ớ: "o",
    ờ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ú: "u",
    ù: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    ứ: "u",
    ừ: "u",
    ử: "u",
    ữ: "u",
    ự: "u",
    ý: "y",
    ỳ: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
    đ: "d",
  };

  const replaceVietnameseCharacters = (str) => {
    return str
      .split("")
      .map((char) => vietnameseToEnglishMap[char] || char)
      .join("");
  };

  const [username] = displayName.split(" ").map(replaceVietnameseCharacters);
  return username;
};

const Header = () => {
  const { data } = useContext(ChatContext);

  console.log("User data in Header:", data.user);

  return (
    <div className="flex w-full items-center border-b px-1 py-1  md:px-3">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex items-center gap-2 active:opacity-30 md:cursor-pointer">
          <div className="relative">
            <div
              className="border-1 relative aspect-square shrink-0 overflow-hidden rounded-full border border-neutral-50 dark:border-neutral-800"
              style={{ width: "36px", height: "36px" }}
            >
              <div
                className="overflow-hidden shrink-0 aspect-square size-12 rounded-none border border-neutral-50  absolute ring-background top-0 left-0 border-none"
                style={{ width: "36px", height: "36px" }}
              >
                <img
                  alt={data.user?.displayName}
                  src={data.user?.photoURL}
                  className="object-cover"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: 0,
                    color: "transparent",
                  }}
                />
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 z-50 h-3.5 w-3.5 rounded-full bg-white p-[2px] dark:bg-neutral-950">
              <div className="h-full w-full rounded-full bg-[#51c878]"></div>
            </div>
          </div>
          <div>
            <p className="break-word-mt line-clamp-1 font-medium">
              {data.user?.displayName}
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
