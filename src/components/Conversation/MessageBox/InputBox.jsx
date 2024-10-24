import { useState, useContext, useRef, useEffect } from "react";
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
import { Earth, Paperclip, Smile, Mic, Send, ChevronUp } from "lucide-react";
import { translateText } from "../../../services/translationService";
import debounce from "lodash/debounce";
import ESLTool from "./ESLTool";
import EmojiPicker from "./EmojiPicker";

const InputBox = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
    console.log("Edit translation");
  };

  const handleEmojiSelect = (emoji) => {
    const start = inputRef.current?.selectionStart || 0;
    const end = inputRef.current?.selectionEnd || 0;
    const newMessage = message.slice(0, start) + emoji + message.slice(end);

    setMessage(newMessage);

    // Di chuyển con trỏ sau emoji
    setTimeout(() => {
      const newCursor = start + emoji.length;
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(newCursor, newCursor);
    });
  };

  return (
    <div className="w-full relative">
      <ESLTool
        isOpen={isESLToolOpen}
        onToggle={() => setIsESLToolOpen(!isESLToolOpen)}
        detectedLanguage={detectedLanguage}
        translatedText={translatedMessage}
        onEdit={handleEditTranslation}
      />
      <div
        className={`flex min-h-[82px] w-full flex-col rounded-2xl border p-1 shadow-sm overflow-hidden transition-all duration-300 ${
          isFocused ? "border-[#3d88ed]" : "border-primary"
        }`}
      >
        <div className="flex items-center">
          <div className="mr-3 flex-1">
            <div className="w-full relative">
              {" "}
              <button
                onClick={() => setIsDetectLanguageOpen(!isDetectLanguageOpen)}
                className="flex h-11 w-full items-center rounded-xl bg-neutral-50 px-3 hover:bg-neutral-100 @md:w-[240px] md:h-10"
              >
                <Earth className="text-blue-500 mr-2 inline-block size-5" />
                <span className="flex-1 text-left">
                  {detectedLanguage
                    ? `Detected :${detectedLanguage}`
                    : "Detect language"}
                </span>
                <ChevronUp />
              </button>
            </div>
          </div>
          <button className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors duration-200">
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors duration-200"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile className="w-5 h-5" />
          </button>
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}
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
