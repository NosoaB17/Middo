import { useState } from "react";

import SignInIcon from "../../assets/navigation/SignIn.svg";
import Logo from "../../assets/navigation/Logo.png";
import login from "../../assets/navigation/log-out.png";
import settings from "../../assets/navigation/settings.png";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="fixed z-10 flex h-14 w-full items-center justify-between bg-white/80 shadow-2 backdrop-blur-xl ">
      <div className="relative z-50 flex h-header w-full items-center justify-between gap-1 bg-primary-100 py-4 pl-[1vw] pr-[5vw]  md:gap-5 md:pl-[5vw]">
        <a
          className="flex w-[60px] flex-row justify-start gap-2 divide-x-[2px] "
          href="/"
        >
          <img src={Logo} alt="MiddoLogo" />
        </a>
        <div className="z-0 flex-1">
          <div className="hidden w-screen flex-row items-stretch justify-center shadow-none md:!ml-0 md:flex md:w-auto md:items-center md:gap-1 lg:gap-5">
            <a
              target="_self"
              className="flex h-9 items-center justify-center gap-2 rounded-xl py-2 font-semibold leading-[18px] text-neutral-700 md:px-2 md:hover:bg-[#d0def1]  md:hover:text-[#3d88ed] md:active:bg-primary-300 lg:px-3"
              href="/solutions"
            >
              Solution
            </a>
            <a
              target="_self"
              className="flex h-9 items-center justify-center gap-2 rounded-xl py-2 font-semibold leading-[18px] text-neutral-700 md:px-2 md:hover:bg-[#d0def1]  md:hover:text-[#3d88ed] md:active:bg-primary-300 lg:px-3"
              href="/products"
            >
              Products
            </a>

            <a
              target="_blank"
              className="flex h-9 items-center justify-center gap-2 rounded-xl py-2 font-semibold leading-[18px] text-neutral-700 md:px-2 md:hover:bg-[#d0def1]  md:hover:text-[#3d88ed] md:active:bg-primary-300 lg:px-3"
              href="https://dudaji.vn/#contact"
            >
              Contact Us
            </a>
            <a
              target="_blank"
              className="flex h-9 items-center justify-center gap-2 rounded-xl py-2 font-semibold leading-[18px] text-neutral-700 md:px-2 md:hover:bg-[#d0def1]  md:hover:text-[#3d88ed] md:active:bg-primary-300 lg:px-3"
              href="https://docs.middo.app/"
            >
              Docs
            </a>
          </div>
        </div>
        <div className="relative h-full md:w-[60px]">
          <button
            className="w-16 h-9 gap-2 rounded-tl-lg bg-neutral-50 group"
            onClick={toggleDropdown}
          >
            <img src={SignInIcon} alt="Sign In" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 h-18 rounded-2xl bg-white rounded-lg shadow-lg py-1 z-50">
              <a
                href="/signin"
                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                onClick={toggleDropdown}
              >
                <img src={login} alt="Sign In" className="w-5 h-5 mr-3" />
                Sign In
              </a>
              <a
                href="/settings"
                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                onClick={toggleDropdown}
              >
                <img src={settings} alt="Settings" className="w-5 h-5 mr-3" />
                Settings
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
