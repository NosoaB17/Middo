import React from "react";
import historyLogo from "../../assets/products/history.svg";
import phrasesLogo from "../../assets/products/phrases.svg";
import copyAllLogo from "../../assets/products/copy-all.svg";
import screenshotLogo from "../../assets/products/screenshot.svg";
import RecordToTranslate from "./RecordToTranslate";

const AddFeatures = ({
  onHistoryClick,
  onCopyAll,
  isEslMatched,
  sourceLanguage,
  targetLanguage,
  onTranscript,
  setSourceText,
  handleTranslate,
}) => {
  const canCopyAll =
    isEslMatched && sourceLanguage !== "en" && targetLanguage !== "en";
  const canTakeScreenshot =
    isEslMatched && sourceLanguage !== "en" && targetLanguage !== "en";

  const handleTranscript = (transcript) => {
    // Xử lý văn bản được chuyển đổi từ giọng nói
    setSourceText(transcript);
    // Có thể kích hoạt dịch tự động ở đây nếu cần
    handleTranslate(transcript);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-end gap-2 px-[5vw]">
        <button
          onClick={onHistoryClick}
          className="flex items-center justify-center bg-[#f2f2f2] md:hover:bg-gray-200 py-2 px-3 rounded-2xl"
        >
          <img src={historyLogo} alt="History" className="w-4 h-4 mr-2" />
          <span className="text-base font-semibold text-[#4d4d4d]">
            History
          </span>
        </button>
        <button className="flex items-center justify-center font-semibold bg-[#f2f2f2] text-[#4d4d4d] md:hover:bg-gray-200 py-2 px-3 rounded-2xl">
          <img src={phrasesLogo} alt="Phrases" className="w-4 h-4 mr-2" />
          <span className="text-base font-semibold text-[#4d4d4d]">
            Phrases
          </span>
        </button>
      </div>
      <div className="mt-8 flex items-center justify-center gap-8">
        <button
          onClick={onCopyAll}
          disabled={!canCopyAll}
          title={canCopyAll ? "Copy all text" : "Cannot copy all text"}
          className={`flex items-center justify-center focus-outline-none  font-medium text-primary bg-primary-200 md:hover:bg-primary-300 rounded-full p-0 shrink-0 w-11 h-11 
            ${canCopyAll ? "bg-blue-200" : "opacity-50 cursor-not-allowed"}`}
        >
          <img src={copyAllLogo} alt="Copy All" className="w-5 h-5" />
        </button>
        <div class="relative ">
          <RecordToTranslate
            onTranscript={handleTranscript}
            sourceLanguage={sourceLanguage}
          />
        </div>
        <button
          disabled={!canTakeScreenshot}
          title={
            canTakeScreenshot ? "Take screenshot" : "Cannot take screenshot"
          }
          className={`flex items-center justify-center focus-outline-none font-medium text-primary bg-primary-200 md:hover:bg-primary-300 rounded-full p-0 shrink-0 w-11 h-11 
            ${
              canTakeScreenshot
                ? "bg-blue-200"
                : "opacity-50 cursor-not-allowed"
            }`}
        >
          <img src={screenshotLogo} alt="Screenshot" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AddFeatures;
