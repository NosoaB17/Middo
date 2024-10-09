import React, { useState } from "react";

const SearchBar = () => {
  return (
    <>
      <div className="w-full">
        <div className="relative w-full overflow-hidden rounded-xl border bg-background transition-all">
          <div className="flex h-11 pl-1 transition-all">
            <input
              placeholder="Search"
              class="w-full border-0 bg-inherit p-2 ring-0 focus:outline-none"
              type="text"
              value=""
            />
            <div className="flex h-11 w-11 items-center bg-inherit dark:text-neutral-50">
              <button
                class="flex aspect-square h-full items-center justify-center p-2 text-primary disabled:text-text dark:text-neutral-50"
                disabled=""
              >
                <span class="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="flex items-center justify-center focus:outline-none transition-all bg-neutral-100 group-hover:bg-neutral-200 rounded-full relative p-0 shrink-0 md:w-9 md:h-9 w-11 h-11"
      >
        <span class="material-symbols-outlined">filter_list</span>
      </button>
    </>
  );
};

export default SearchBar;
