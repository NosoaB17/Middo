// InputBox.jsx
import { useState, useContext, useRef, useEffect } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import {
  Earth,
  Paperclip,
  Smile,
  Mic,
  Send,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { translateText } from "../../../services/translationService";
import debounce from "lodash/debounce";

const InputBox = () => {
  const [message, setMessage] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [translatedMessage, setTranslatedMessage] = useState("");
  const [isDetectLanguageOpen, setIsDetectLanguageOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
          const response = await translateText(text, "auto", "en");
          setDetectedLanguage(response.detectedLanguage.toUpperCase());
          if (response.detectedLanguage.toLowerCase() !== "en") {
            setTranslatedMessage(response.translatedText);
          } else {
            setTranslatedMessage("");
          }
        } catch (error) {
          console.error("Error detecting language:", error);
          setDetectedLanguage("");
          setTranslatedMessage("");
        }
      } else {
        setDetectedLanguage("");
        setTranslatedMessage("");
      }
    }, 300)
  ).current;

  useEffect(() => {
    debouncedDetectLanguage(message);
    return () => debouncedDetectLanguage.cancel();
  }, [message, debouncedDetectLanguage]);

  const handleSend = async () => {
    if (message.trim() && data.chatId && data.chatId !== "null") {
      try {
        let finalTranslatedText = translatedMessage;

        // If translation hasn't happened yet, do it now
        if (!finalTranslatedText && detectedLanguage !== "EN") {
          const response = await translateText(message, detectedLanguage, "en");
          finalTranslatedText = response.translatedText;
        }
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

        // Update last message in userChats for both users
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
        console.log("translate complete");
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

  return (
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
            className="flex h-10 w-full items-center justify-between rounded-xl bg-[#e6e6e6] px-3 hover:bg-neutral-100 transition-colors duration-200"
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
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
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
  );
};

export default InputBox;
