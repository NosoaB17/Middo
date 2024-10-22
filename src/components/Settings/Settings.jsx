import { useState, useEffect, useCallback } from "react";
import detectIcon from "../../assets/products/lang-detect.svg";
import englishIcon from "../../assets/products/uk-flag.svg";
import vietnameseIcon from "../../assets/products/vn-flag.svg";
import koreanIcon from "../../assets/products/kr-flag.svg";
import themeIcon from "../../assets/setting/theme.svg";

const Settings = () => {
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("Light");

  const languages = [
    { value: "English", label: "English", icon: englishIcon },
    { value: "Korean", label: "한국어", icon: koreanIcon },
    { value: "Vietnamese", label: "Tiếng Việt", icon: vietnameseIcon },
  ];

  // Sử dụng useCallback để tránh tạo lại hàm này mỗi lần render
  const getLangIcon = useCallback(
    (langValue) => {
      const lang = languages.find((l) => l.value === langValue);
      return lang ? lang.icon : detectIcon;
    },
    [languages]
  );

  useEffect(() => {
    // Cập nhật icon khi ngôn ngữ thay đổi
    getLangIcon(language);
  }, [language, getLangIcon]);

  return (
    <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-90% max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <button className="w-full py-3 bg-gray-100 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors">
          <span>Sign in / Sign up</span>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3 mb-4">
          <img
            src={getLangIcon(language)}
            alt="Selected language"
            className="w-6 h-6 mr-3"
          />
          <span className="flex-grow font-medium text-gray-700">
            Display Language
          </span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white rounded-lg border-none py-2 px-3 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
          <img src={themeIcon} alt="theme" className="w-6 h-6 mr-3" />
          <span className="flex-grow font-medium text-gray-700">Theme</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-white rounded-lg border-none py-2 px-3 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            <option value="System">System</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
