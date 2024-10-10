import React, { useCallback, useState, useEffect, useMemo } from "react";
import copyLogo from "../../assets/products/copy.svg";
import speakerLogo from "../../assets/products/speaker.svg";
import editLogo from "../../assets/products/edit.svg";
import checkIcon from "../../assets/products/check.svg";
import { textToSpeech } from "../../services/translationService";

import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TranslateArea = ({
  type,
  text,
  setText,
  language,
  onTranslate,
  detectedLanguage,
  languages = {},
  eslText,
  isEslMatched,
  onEslEdit,
  onEslConfirm,
  showEsl,
}) => {
  const [isEditingEsl, setIsEditingEsl] = useState(false);
  const [editedEslText, setEditedEslText] = useState(eslText?.[type] || "");
  const [fontSize, setFontSize] = useState(22);
  const [textareaHeight, setTextareaHeight] = useState("auto");

  // Update editedEslText when eslText changes (e.g., after language swap)
  useEffect(() => {
    setEditedEslText(eslText?.[type] || "");
  }, [eslText, type]);

  const adjustFontSize = useCallback(() => {
    const textArea = document.getElementById(`${type}-textarea`);
    if (textArea) {
      let currentFontSize = 22;
      textArea.style.height = "auto";
      textArea.style.fontSize = `${currentFontSize}px`;

      while (
        textArea.scrollHeight > textArea.offsetHeight &&
        currentFontSize > 16
      ) {
        currentFontSize--;
        textArea.style.fontSize = `${currentFontSize}px`;
      }

      setFontSize(currentFontSize);
      setTextareaHeight(`${textArea.scrollHeight}px`);
    }
  }, [type]);

  const handleEslEdit = useCallback(() => {
    setIsEditingEsl(true);
    setEditedEslText(eslText?.[type] || "");
  }, [eslText, type]);

  const handleEslSave = useCallback(() => {
    setIsEditingEsl(false);
    onEslEdit({
      ...eslText,
      [type]: editedEslText,
    });
  }, [editedEslText, eslText, onEslEdit, type]);

  const getCountryCode = useCallback((lang) => {
    const languageToCountry = {
      en: "gb",
      ko: "kr",
      vi: "vn",
      // Add more mappings as needed
    };
    return languageToCountry[lang] || lang;
  }, []);

  const getLanguageDisplay = useCallback(
    (lang) => {
      if (lang === "auto" && detectedLanguage) {
        return `Detected: ${languages[detectedLanguage]}`;
      }
      if (lang === "auto") {
        return "Detect Language";
      }
      return languages[lang] || lang;
    },
    [languages, detectedLanguage]
  );

  const handleTextChange = useCallback(
    (e) => {
      setText(e.target.value);
      adjustFontSize();
      if (type === "source") {
        // Cancel previous timeout if it exists
        if (window.translationTimeout) {
          clearTimeout(window.translationTimeout);
        }

        // Set new timeout
        window.translationTimeout = setTimeout(() => {
          onTranslate(e.target.value);
        }, 2000);
      }
    },
    [setText, type, onTranslate, adjustFontSize]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }, [text]);

  const handleSpeak = useCallback(async () => {
    try {
      const audioBlob = await textToSpeech(text, language);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }, [text, language]);

  const renderEslSection = useMemo(() => {
    if (!showEsl || !eslText || !eslText[type]) return null;

    const eslColor = isEslMatched ? "text-green-500" : "text-red-500";
    const currentEslText = eslText[type];

    return (
      <div className="bg-[#f2f2f2] relative rounded-[8px] bg-background-darker dark:bg-neutral-800 p-3 mb-20">
        <div className="flex">
          <img
            src={`https://hatscripts.github.io/circle-flags/flags/gb.svg`}
            alt="English"
            className="w-5 h-5 mr-2"
          />
          <div className="flex-1 overflow-hidden">
            {isEditingEsl && type === "source" ? (
              <textarea
                value={editedEslText}
                onChange={(e) => setEditedEslText(e.target.value)}
                className="w-full bg-white p-2 rounded"
              />
            ) : (
              <span className={`${eslColor} font-medium flex-grow`}>
                {currentEslText}
              </span>
            )}
          </div>
        </div>
        <div className="mt-2 flex justify-end">
          {type === "source" &&
            !isEslMatched &&
            (isEditingEsl ? (
              <>
                <button
                  onClick={() => setIsEditingEsl(false)}
                  className="mr-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEslSave}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={handleEslEdit}
                className="flex items-center justify-center focus:outline-none font-medium rounded-full bg-transparent text-neutral-700 md:hover:bg-neutral-50 p-0 shrink-0 md:w-9 md:h-9 w-11 h-11"
                title="Edit E.S.L translation"
              >
                <img src={editLogo} alt="Edit" className="w-4 h-4" />
              </button>
            ))}
          {type === "target" && !isEslMatched && (
            <button
              onClick={onEslConfirm}
              className="flex items-center justify-center focus:outline-none font-medium rounded-full bg-transparent text-neutral-700 md:hover:bg-neutral-50 p-0 shrink-0 md:w-9 md:h-9 w-11 h-11"
              title="Confirm E.S.L translation"
            >
              <img src={checkIcon} alt="Confirm" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }, [
    showEsl,
    type,
    isEditingEsl,
    eslText,
    isEslMatched,
    editedEslText,
    handleEslSave,
    handleEslEdit,
    onEslConfirm,
  ]);

  const handleClear = useCallback(() => {
    setText("");
    onTranslate("");
  }, [setText, onTranslate]);

  useEffect(() => {
    adjustFontSize();
  }, [text, adjustFontSize]);

  useEffect(() => {
    return () => {
      if (window.translationTimeout) {
        clearTimeout(window.translationTimeout);
      }
    };
  }, []);

  return (
    <div
      className={`flex h-full w-full flex-col gap-5 py-3 md:flex-row md:justify-evenly md:gap-[88px] ${
        type === "target" ? "pl-0 pr-16" : "px-[5vw]"
      }`}
    >
      <div
        className={`bg-white rounded-[20px] border-solid text-[#020817] flex flex-col basis-0 leading-[24px] p-[20px] relative transition-all md:min-h-[320px] md:flex-1 min-h-[320px] overflow-hidden ${
          type === "target"
            ? "border border-[#f2f2f2]"
            : "border border-[#3d88ed]"
        } `}
      >
        <div className="flex items-center justify-start gap-2 text-[#020817] leading-[24px] mb-[12px]">
          <div className="size-5 overflow-hidden rounded-full">
            {(language !== "auto" || detectedLanguage) && (
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${getCountryCode(
                  detectedLanguage || language
                )}.svg`}
                alt={detectedLanguage || language}
                height="35"
                className="w-5 h-5 mr-2"
              />
            )}
          </div>
          <span className="opacity-40">{getLanguageDisplay(language)}</span>
          <button
            onClick={handleClear}
            type="button"
            class="flex items-center justify-center focus-outline-none rounded-full bg-transparent text-neutral-700 md:hover:bg-neutral-50 absolute right-3 top-3 p-0 shrink-0 md:w-9 md:h-9 w-11 h-11"
            data-label-id="0"
            data-metatip="true"
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
              class="lucide lucide-circle-x inline-block w-5 h-5"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m15 9-6 6"></path>
              <path d="m9 9 6 6"></path>
            </svg>
          </button>
        </div>
        <textarea
          id={`${type}-textarea`}
          value={text}
          onChange={handleTextChange}
          placeholder={
            type === "source" ? "Enter your text here" : "Translation"
          }
          readOnly={type === "target"}
          style={{ fontSize: `${fontSize}px`, height: textareaHeight }}
          className="w-full bg-transparent font-medium text-[#020817] text-xl leading-relaxed flex-1 border-none resize-none outline-none mb-4"
        />

        {renderEslSection}

        <div className="absolute bottom-3 right-3 flex justify-end gap-2">
          <button
            onClick={handleSpeak}
            title="Listen"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <img src={speakerLogo} alt="Speak" className="w-5 h-5" />
          </button>
          <div>
            <button
              onClick={handleCopy}
              title="Copy to clipboard"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <img src={copyLogo} alt="Copy" className="w-5 h-5" />
            </button>
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Zoom}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TranslateArea);
