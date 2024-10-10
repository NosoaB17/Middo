import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/navigation/Logo.png";
import TranslationIcon from "../../assets/navigation/Translation.svg";
import ConversationIcon from "../../assets/navigation/Conversation.svg";
import ExtensionIcon from "../../assets/navigation/Extension.svg";
import DocsIcon from "../../assets/navigation/Docs.svg";
import SignIn from "../../assets/navigation/SignIn.svg";
import login from "../../assets/navigation/log-out.png";
import settings from "../../assets/navigation/settings.png";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const getFirstName = (fullName) => {
    return fullName.split(" ")[0];
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const DropdownMenu = ({ currentUser, onLogout, onClose }) => {
    const menuItems = currentUser
      ? [
          {
            label: currentUser.displayName || currentUser.email,
            isHeader: true,
          },
          { label: "Account Settings", icon: settings, to: "/settings" },
          { label: "Sign Out", icon: login, onClick: onLogout },
        ]
      : [
          { label: "Sign In", icon: login, to: "/signin" },
          { label: "Settings", icon: settings, to: "/settings" },
        ];

    return (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
        {menuItems.map((item, index) =>
          item.isHeader ? (
            <span
              key={index}
              className="block px-4 py-2 text-sm text-gray-700 font-bold border-b border-gray-200"
            >
              {item.label}
            </span>
          ) : (
            <Link
              key={index}
              to={item.to}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => {
                if (item.onClick) item.onClick();
                onClose();
              }}
            >
              <img src={item.icon} alt={item.label} className="w-4 h-4 mr-2" />
              {item.label}
            </Link>
          )
        )}
      </div>
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logging out");
      navigate("/");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleTabClick = (tab) => {
    switch (tab) {
      case "Translation":
        setActiveTab("Translation");
        navigate("/products");
        break;
      case "Conversation":
        if (currentUser) {
          setActiveTab("Conversation");
          navigate("/conversation");
        } else {
          setActiveTab(null);
          navigate("/signin");
        }
        break;
      case "Extension":
        setActiveTab(null);
        window.open("https://middo.app/spaces", "_blank");
        break;
      case "Docs":
        setActiveTab(null);
        window.open("https://docs.middo.app/", "_blank");
        break;
      default:
        setActiveTab(null);
        break;
    }
  };

  const tabs = [
    { name: "Translation", icon: TranslationIcon },
    { name: "Conversation", icon: ConversationIcon },
    { name: "Extension", icon: ExtensionIcon },
    { name: "Docs", icon: DocsIcon },
  ];

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/conversation") && currentUser) {
      setActiveTab("Conversation");
    } else if (path === "/products") {
      setActiveTab("Translation");
    } else {
      setActiveTab(null);
    }
  }, [location, currentUser]);

  return (
    <nav className="bg-white shadow h-[52px] w-full sticky top-0 z-[1000]">
      <div className="max-w-full mx-auto h-full flex justify-between items-center px-4 md:px-6 lg:px-8">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Middo Logo"
            onClick={handleLogoClick}
            className="h-8 cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-center space-x-1 md:space-x-2 lg:space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center px-2 py-1 md:px-3 md:py-2 rounded-xl text-sm font-medium transition-colors duration-200
                ${
                  activeTab === tab.name
                    ? "bg-blue-500 text-neutral-50"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-500"
                }`}
              onClick={() => handleTabClick(tab.name)}
            >
              <span className="font-semibold text-base">{tab.name}</span>
              <img
                src={tab.icon}
                alt={`${tab.name} icon`}
                className={`w-4 h-4 ml-3 ${
                  activeTab === tab.name ? "fill-slate-50" : ""
                }`}
              />
            </button>
          ))}
        </div>
        <div className="relative">
          <button
            className="flex items-center p-[5px] rounded-[20px] cursor-pointer text-[14px] text-[#333]"
            onClick={toggleDropdown}
          >
            {currentUser ? (
              <>
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || currentUser.email}
                  className="w-8 h-8 rounded-full mr-2 object-cover overflow-hidden"
                />
                <span className="hidden md:inline text-sm text-gray-700">
                  {getFirstName(currentUser.displayName || currentUser.email)}
                </span>
              </>
            ) : (
              <img src={SignIn} alt="User" />
            )}
          </button>
          {isDropdownOpen && (
            <DropdownMenu
              currentUser={currentUser}
              onLogout={handleLogout}
              onClose={() => setIsDropdownOpen(false)}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
