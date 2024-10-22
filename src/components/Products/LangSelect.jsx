import React, { useState, useMemo, useCallback } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import detectIcon from "../../assets/products/lang-detect.svg";
import arrowDownIcon from "../../assets/products/arrowDown.svg";
import swapIcon from "../../assets/products/swap.svg";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// const DEFAULT_SOURCE_LANGUAGES = ["auto", "en", "ko"];
const DEFAULT_TARGET_LANGUAGES = ["en", "ko", "vi"];

const LangSelect = ({
  onLanguageChange,
  sourceLanguage,
  targetLanguage,
  languages,
  detectedLanguage,
}) => {
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [selectingFor, setSelectingFor] = useState("source");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSourceLang, setRecentSourceLang] = useState(null);
  const [recentTargetLang, setRecentTargetLang] = useState(null);
  const [detectedLang, setDetectedLang] = useState(null);

  const filteredLanguages = useMemo(() => {
    return Object.entries(languages).filter(([code, name]) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [languages, searchQuery]);

  const getCountryCode = useCallback((lang) => {
    if (lang === "auto") return "auto";
    const languageToCountry = {
      en: "gb",
      ko: "kr",
      zh: "cn",
      ja: "jp",
      vi: "vn",
      he: "il",
      fa: "ir",
      ar: "sa",
    };
    return languageToCountry[lang] || lang;
  }, []);

  const handleLanguageChange = useCallback(
    (lang, type) => {
      if (type === "source") {
        if (lang === targetLanguage) {
          onLanguageChange("source", lang);
          onLanguageChange("target", sourceLanguage);
          setRecentSourceLang(lang);
          setRecentTargetLang(sourceLanguage);
        } else {
          onLanguageChange("source", lang);
          setRecentSourceLang(lang);
        }
      } else {
        if (lang === sourceLanguage) {
          onLanguageChange("target", lang);
          onLanguageChange("source", targetLanguage);
          setRecentTargetLang(lang);
          setRecentSourceLang(targetLanguage);
        } else {
          onLanguageChange("target", lang);
          setRecentTargetLang(lang);
        }
      }
      setShowLanguageSelect(false);
    },
    [onLanguageChange, sourceLanguage, targetLanguage]
  );

  const renderLanguageButton = useCallback(
    (lang, type, isActive) => {
      const countryCode = getCountryCode(lang);
      const languageName =
        lang === "auto" && detectedLanguage
          ? `Detected: ${languages[detectedLanguage]}`
          : lang === "auto"
          ? "Detect"
          : languages[lang]
          ? capitalizeFirstLetter(languages[lang])
          : capitalizeFirstLetter(lang);

      return (
        <button
          key={lang}
          className={`flex items-center px-3 py-2 rounded-xl transition-colors ${
            isActive ? "bg-white text-blue-500 shadow-sm" : "hover:bg-gray-200"
          }`}
          onClick={() => handleLanguageChange(lang, type)}
        >
          {lang === "auto" ? (
            <img
              src={detectIcon}
              alt="Detect language"
              className="w-5 h-5 mr-2"
            />
          ) : (
            <img
              src={`https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg`}
              alt={languageName}
              className="w-5 h-5 mr-2"
            />
          )}
          <span>{languageName}</span>
        </button>
      );
    },
    [languages, getCountryCode, handleLanguageChange, detectedLanguage]
  );

  // Điều chỉnh hàm renderLanguageButtons
  const renderLanguageButtons = useCallback(
    (type) => {
      const currentLanguage =
        type === "source" ? sourceLanguage : targetLanguage;
      const recentLang =
        type === "source" ? recentSourceLang : recentTargetLang;
      const defaultLanguages =
        type === "source" ? ["auto", "en", "ko"] : DEFAULT_TARGET_LANGUAGES;

      let displayLanguages = [...defaultLanguages];
      if (
        type === "target" &&
        recentLang &&
        !defaultLanguages.includes(recentLang)
      ) {
        displayLanguages = [recentLang, ...defaultLanguages.slice(0, -1)];
      }

      return displayLanguages.map((lang, index) => {
        const isActive =
          currentLanguage === lang || (lang === "auto" && detectedLang);

        // Chỉ cho phép thay đổi "en" và "ko" cho source
        const isChangeable =
          type === "target" ||
          (type === "source" && (lang === "en" || lang === "ko"));

        return renderLanguageButton(
          lang,
          type,
          isActive,
          isChangeable,
          index === 0
        );
      });
    },
    [
      sourceLanguage,
      targetLanguage,
      recentSourceLang,
      recentTargetLang,
      renderLanguageButton,
      detectedLang,
    ]
  );

  return (
    <div className="flex w-full items-center justify-center gap-5 md:gap-0 px-[5vw]">
      <div className="flex h-[42px] w-full flex-1 items-center gap-2">
        <div className="flex h-full w-full max-w-full gap-2 overflow-hidden rounded-xl text-[#4d4d4d]  font-semibold lg:w-fit lg:max-w-[calc(100%-48px)] lg:bg-neutral-100 lg:p-1">
          {renderLanguageButtons("source")}
        </div>
        <button
          className="items-center justify-center bg-neutral-100 text-[#4d4d4d] md:hover:bg-neutral-200 rounded-full hidden lg:flex md:w-10 md:h-10"
          onClick={() => {
            setSelectingFor("source");
            setShowLanguageSelect(true);
          }}
        >
          <img src={arrowDownIcon} alt="More languages" className="w-5 h-5" />
        </button>
      </div>
      <div className="flex w-5 items-center justify-center pr-3.5 md:w-[88px]">
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200  transition"
          onClick={() => {
            if (sourceLanguage !== "auto") {
              onLanguageChange("source", targetLanguage);
              onLanguageChange("target", sourceLanguage);
            }
          }}
          disabled={sourceLanguage === "auto"}
        >
          <img src={swapIcon} alt="Swap languages" className="w-5 h-5" />
        </button>
      </div>
      <div className="flex h-[42px] w-full flex-1 items-center gap-2">
        <div className="flex h-full w-full max-w-full gap-2 overflow-hidden rounded-xl text-[#4d4d4d] font-semibold lg:w-fit lg:max-w-[calc(100%-48px)] lg:bg-neutral-100 lg:p-1">
          {renderLanguageButtons("target")}
        </div>
        <button
          className="items-center justify-center bg-neutral-100 text-neutral-700 md:hover:bg-neutral-200 rounded-full hidden lg:flex md:w-10 md:h-10"
          onClick={() => {
            setSelectingFor("target");
            setShowLanguageSelect(true);
          }}
        >
          <img src={arrowDownIcon} alt="More languages" className="w-5 h-5" />
        </button>
      </div>

      {showLanguageSelect && (
        <div className="fixed inset-0 bg-white z-20 flex flex-col items-center justify-center h-full w-full bg-background left-0 top-[72px] ">
          <div className="mx-[216px] pb-10 flex flex-col justify-center">
            <div className="flex justify-center items-center mb-5 py-2.5 px-[93.6px]">
              <button
                className="flex items-center  absolute ml-56 font-medium rounded-full shrink-0 w-11 h-11 bg-transparent md:w-9 md:h-9  md:left-[5vw]"
                onClick={() => setShowLanguageSelect(false)}
              >
                <ArrowBackIcon className="w-6 h-6" />
              </button>
              <p class="text-blue-500 font-semibold capitalize text-primary">
                Select Language
              </p>
            </div>
            <div className="flex-1 overflow-hidden md:px-[5vw]">
              {" "}
              <div className="flex flex-col h-full">
                <div className="px-5 py-5 pt-0 md:mx-auto md:w-[480px]">
                  <div className="relative w-full overflow-hidden rounded-xl border bg-background transition-all">
                    <div className="flex h-11 pl-1 transition-all">
                      <input
                        type="text"
                        placeholder="Search languages"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-0 bg-inherit p-2 ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent"
                      />
                      <div className="flex h-11 w-11 items-center bg-inherit ">
                        <button
                          class="flex aspect-square h-full items-center justify-center p-2 text-primary disabled:text-text dark:text-neutral-50"
                          disabled=""
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-search h-5 w-5 opacity-60"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col overflow-y-auto md:flex-row md:flex-wrap md:h-[calc(100vh-200px)]">
                  {filteredLanguages.map(([code, name]) => (
                    <button
                      key={code}
                      className={`flex w-full items-center px-5 py-3 md:w-1/3 hover:bg-blue-100 ${
                        (selectingFor === "source"
                          ? sourceLanguage
                          : targetLanguage) === code
                          ? "bg-blue-100 text-blue-700 font-bold w-full"
                          : ""
                      }`}
                      onClick={() => {
                        handleLanguageChange(code, selectingFor);
                      }}
                    >
                      <span>{capitalizeFirstLetter(name)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(LangSelect);
