import React, { useState, useEffect } from "react";
import LangSelect from "../components/Products/LangSelect";
import TranslateArea from "../components/Products/TranslateArea";
import AddFeatures from "../components/Products/AddFeatures";
import HistoryModal from "../components/Products/HistoryModal";
import { fetchLanguages, translateText } from "../services/translationService";
import { v4 as uuidv4 } from "uuid";

const Products = () => {
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [eslText, setEslText] = useState({ source: "", target: "" });
  const [isEslMatched, setIsEslMatched] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [languages, setLanguages] = useState({});
  const [showEsl, setShowEsl] = useState(false);

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const languagesData = await fetchLanguages();
        setLanguages(languagesData);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    getLanguages();
  }, []);

  const handleLanguageChange = (type, lang) => {
    if (type === "source") {
      if (lang === targetLanguage) {
        // Swap languages
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
        setSourceText(targetText);
        setTargetText(sourceText);
        setEslText({
          source: eslText.target,
          target: eslText.source,
        });
      } else {
        setSourceLanguage(lang);
      }
    } else {
      if (lang === sourceLanguage) {
        // Swap languages
        setTargetLanguage(sourceLanguage);
        setSourceLanguage(targetLanguage);
        setTargetText(sourceText);
        setSourceText(targetText);
        setEslText({
          source: eslText.target,
          target: eslText.source,
        });
      } else {
        setTargetLanguage(lang);
      }
    }
    // Reset detected language when changing source language
    if (type === "source") {
      setDetectedLanguage(null);
    }
  };

  const handleSwapLanguages = () => {
    if (sourceLanguage !== "auto") {
      setSourceLanguage(targetLanguage);
      setTargetLanguage(sourceLanguage);
      setSourceText(targetText);
      setTargetText(sourceText);
      setEslText({
        source: eslText.target,
        target: eslText.source,
      });
      setDetectedLanguage(null);
    }
  };

  const handleTranslate = async (text) => {
    try {
      setShowEsl(false); // Hide ESL before translation starts
      const { translatedText, eslSource, eslTarget, detectedLanguage } =
        await translateText(text, sourceLanguage, targetLanguage);

      setTargetText(translatedText);
      setEslText({
        source: eslSource,
        target: eslTarget,
      });

      // Calculate isEslMatched
      const isMatched =
        eslSource.toLowerCase().trim() === eslTarget.toLowerCase().trim();
      setIsEslMatched(isMatched);

      if (sourceLanguage === "auto" && detectedLanguage) {
        setDetectedLanguage(detectedLanguage);
        setSourceLanguage(detectedLanguage);
      }

      // Add translation to history
      const newTranslation = {
        id: uuidv4(),
        sourceText: text,
        targetText: translatedText,
        sourceLanguage: detectedLanguage || sourceLanguage,
        targetLanguage,
        eslSource,
        eslTarget,
        isEslMatched: isMatched,
      };
      setHistory((prevHistory) => [newTranslation, ...prevHistory]);

      setShowEsl(true); // Show ESL after translation is complete
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const handleEslEdit = (newEslText) => {
    setEslText(newEslText);
  };

  const handleEslConfirm = () => {
    setIsEslMatched(true);
  };

  const handleHistoryClick = () => {
    setIsHistoryOpen(true);
  };

  const handleCopyAll = () => {
    const textToCopy = `${sourceText}\n${targetText}\n${eslText.source}\n${eslText.target}`;
    navigator.clipboard.writeText(textToCopy);
    alert("All text copied to clipboard!");
  };

  const handleDeleteTranslation = (id) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="mx-auto">
      <div className="flex w-full flex-col py-5">
        <div
          className={`transition-all duration-300 ease-in-out ${
            isHistoryOpen ? "mr-[300px]" : ""
          }`}
        >
          <LangSelect
            onLanguageChange={handleLanguageChange}
            onSwapLanguages={handleSwapLanguages}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            languages={languages}
            detectedLanguage={detectedLanguage}
          />
          <div className="flex gap-5 mt-5">
            <TranslateArea
              type="source"
              text={sourceText}
              setText={setSourceText}
              language={sourceLanguage}
              onTranslate={handleTranslate}
              detectedLanguage={detectedLanguage}
              languages={languages}
              eslText={eslText}
              isEslMatched={isEslMatched}
              onEslEdit={handleEslEdit}
              onEslConfirm={handleEslConfirm}
              showEsl={showEsl}
            />
            <TranslateArea
              type="target"
              text={targetText}
              setText={setTargetText}
              language={targetLanguage}
              eslText={eslText}
              isEslMatched={isEslMatched}
              onEslConfirm={handleEslConfirm}
              showEsl={showEsl}
            />
          </div>
          <AddFeatures
            onHistoryClick={handleHistoryClick}
            onCopyAll={handleCopyAll}
            isEslMatched={isEslMatched}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
          />
        </div>
        <HistoryModal
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
          onDeleteTranslation={handleDeleteTranslation}
          onClearHistory={handleClearHistory}
        />
      </div>
    </div>
  );
};

export default Products;
