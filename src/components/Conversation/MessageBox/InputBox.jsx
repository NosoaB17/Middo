import React, { useState, useContext, useRef, useEffect } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  Earth,
  Paperclip,
  Smile,
  Mic,
  Send,
  ChevronUp,
  ChevronDown,
  Edit2,
} from "lucide-react";
import { translateText } from "../../../services/translationService";
import debounce from "lodash/debounce";

const ESLTranslationTool = ({
  isOpen,
  onToggle,
  detectedLanguage,
  translatedText,
  onEdit,
}) => {
  return (
    <div
      className={`bg-white border rounded-lg p-2 mb-2 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img
            src="https://hatscripts.github.io/circle-flags/flags/gb.svg"
            alt="UK Flag"
            className="w-5 h-5 mr-2"
          />
          <span className="font-semibold">E.S.L Translation Tool</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={onToggle}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="flex justify-between">
        <div className="mt-2 p-2  rounded">
          <p className="text-base">{translatedText}</p>
        </div>
        <button
          onClick={onEdit}
          className="w-9 h-9 rounded-full p-2 hover:bg-gray-100"
        >
          <Edit2 size={20} />
        </button>
      </div>
    </div>
  );
};

const InputBox = () => {
  const [message, setMessage] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [translatedMessage, setTranslatedMessage] = useState("");
  const [isDetectLanguageOpen, setIsDetectLanguageOpen] = useState(false);
  const [isESLToolOpen, setIsESLToolOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]);

  const debouncedDetectLanguage = useRef(
    debounce(async (text) => {
      if (text.trim()) {
        try {
          setIsTranslating(true);
          const response = await translateText(text, "auto", "en");
          setDetectedLanguage(response.detectedLanguage.toUpperCase());
          if (response.detectedLanguage.toLowerCase() !== "en") {
            setTranslatedMessage(response.translatedText);
            setIsESLToolOpen(true);
          } else {
            setTranslatedMessage("");
            setIsESLToolOpen(false);
          }
        } catch (error) {
          console.error("Error detecting language:", error);
          setDetectedLanguage("");
          setTranslatedMessage("");
        } finally {
          setIsTranslating(false);
        }
      } else {
        setDetectedLanguage("");
        setTranslatedMessage("");
        setIsESLToolOpen(false);
      }
    }, 300)
  ).current;

  useEffect(() => {
    debouncedDetectLanguage(message);
    return () => debouncedDetectLanguage.cancel();
  }, [message, debouncedDetectLanguage]);

  const handleSend = async () => {
    if (
      message.trim() &&
      data.chatId &&
      data.chatId !== "null" &&
      !isTranslating
    ) {
      try {
        const messageData = {
          text: message,
          senderId: currentUser.uid,
          date: serverTimestamp(),
          detectedLanguage: detectedLanguage,
          translatedText: translatedMessage || null,
        };

        await addDoc(
          collection(db, "chats", data.chatId, "messages"),
          messageData
        );

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [`${data.chatId}.lastMessage`]: { text: message },
          [`${data.chatId}.date`]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
          [`${data.chatId}.lastMessage`]: { text: message },
          [`${data.chatId}.date`]: serverTimestamp(),
        });

        setMessage("");
        setTranslatedMessage("");
        setDetectedLanguage("");
        setIsESLToolOpen(false);
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEditTranslation = () => {
    // Implement logic to edit translation
    console.log("Edit translation");
  };

  return (
    <div className="w-full">
      <ESLTranslationTool
        isOpen={isESLToolOpen}
        onToggle={() => setIsESLToolOpen(!isESLToolOpen)}
        detectedLanguage={detectedLanguage}
        translatedText={translatedMessage}
        onEdit={handleEditTranslation}
      />
      <div
        className={`flex min-h-[82px] w-full flex-col rounded-2xl border p-1 shadow-sm overflow-hidden transition-all duration-300 ${
          isFocused
            ? "border-[#3d88ed] ring-2 ring-[#3d88ed]/50"
            : "border-primary"
        }`}
      >
        <div className="flex items-center">
          <div className="mr-2 flex-1">
            <button
              onClick={() => setIsDetectLanguageOpen(!isDetectLanguageOpen)}
              className="flex h-10 w-full items-center justify-between rounded-xl bg-[#f2f2f2] px-3 hover:bg-neutral-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <Earth className="text-blue-500 mr-2 inline-block size-5" />
                <span className="flex-1 text-left">
                  {detectedLanguage || "Detect language"}
                </span>
              </div>
              {isDetectLanguageOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          <button className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors duration-200">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors duration-200">
            <Smile className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center px-2 py-1">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message"
            className="flex-grow resize-none overflow-hidden bg-transparent focus:outline-none"
            rows={1}
          />
          {message.trim() ? (
            <button
              onClick={handleSend}
              disabled={isTranslating}
              className={`text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                isTranslating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors duration-200">
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputBox;
