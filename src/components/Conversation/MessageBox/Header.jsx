const Header = () => {
  return (
    <div className="flex w-full items-center border-b px-1 py-1 md:px-3">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex items-center gap-2  md:cursor-pointer">
          <div className="relative">
            <div
              className="border-1 relative aspect-square shrink-0 overflow-hidden rounded-full border border-neutral-50 dark:border-neutral-800"
              style={{ width: "36px", height: "36px" }}
            >
              <div
                className="overflow-hidden shrink-0 aspect-square size-12 rounded-none border border-neutral-50 dark:border-neutral-800 absolute ring-background top-0 left-0 border-none"
                style={{ width: "36px", height: "36px" }}
              >
                <img
                  alt="BaoSon"
                  className="object-cover"
                  sizes="(max-width: 640px) 100px, 200px"
                  src="https://lh3.googleusercontent.com/a/ACg8ocJfutiqP1vzRL_goZ3TN9R7Bi5TOuYWdeBrA73L7Kcmr6HVm4YB=s96-c"
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
              <div className="h-full w-full rounded-full bg-success"></div>
            </div>
          </div>
          <div>
            <p className="break-word-mt line-clamp-1 font-medium">BaoSon</p>
            <p className="line-clamp-1 text-sm font-light">@ngsn176</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
          aria-label="Start Middo Call"
        >
          <span className="material-symbols-outlined">call</span>
        </button>
        <button
          className="p-2 text-blue-600 hover:bg-gray-100 rounded-full"
          aria-label="Show Conversation Information"
        >
          <span className="material-symbols-outlined">info</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
