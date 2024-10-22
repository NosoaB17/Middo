import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";
import { useDiscussion } from "../../../contexts/DiscussionContext";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Send, Smile, Paperclip, Earth, ChevronUp, Mic } from "lucide-react";
import { translateText } from "../../../services/translationService";
import debounce from "lodash/debounce";
import ESLTool from "./ESLTool";

const DiscussionInput = () => {
  const [message, setMessage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [translatedMessage, setTranslatedMessage] = useState("");
  const [isDetectLanguageOpen, setIsDetectLanguageOpen] = useState(false);
  const [isESLToolOpen, setIsESLToolOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data: chatData } = useContext(ChatContext);
  const { data: discussionData } = useDiscussion();
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Debounced language detection
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
    if (!message.trim() || isTranslating || !discussionData.originMessage)
      return;

    try {
      setIsTranslating(true);

      // Add reply to discussion
      const replyRef = await addDoc(
        collection(
          db,
          "chats",
          chatData.chatId,
          "messages",
          discussionData.originMessage.id,
          "replies"
        ),
        {
          text: message,
          senderId: currentUser.uid,
          createdAt: serverTimestamp(),
          detectedLanguage,
          translatedText: translatedMessage || null,
        }
      );

      // Update original message with reply count
      await updateDoc(
        doc(
          db,
          "chats",
          chatData.chatId,
          "messages",
          discussionData.originMessage.id
        ),
        {
          replyCount: (discussionData.replies.length || 0) + 1,
          lastReplyAt: serverTimestamp(),
        }
      );

      console.log("Reply sent:", replyRef.id);
      setMessage("");
      setTranslatedMessage("");
      setDetectedLanguage("");
      setIsESLToolOpen(false);
    } catch (error) {
      console.error("Error sending reply:", error);
    } finally {
      setIsTranslating(false);
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

  return (
    <div className="border-t p-3">
      <ESLTool
        isOpen={isESLToolOpen}
        onToggle={() => setIsESLToolOpen(!isESLToolOpen)}
        translatedText={translatedMessage}
        onEdit={handleEditTranslation}
      />
      <div
        className={`flex min-h-[86px] w-full flex-col rounded-2xl border p-1 shadow-sm overflow-hidden transition-all duration-300 ${
          isFocused ? "border-[#3d88ed]" : "border-primary"
        }`}
      >
        <div className="flex items-center">
          <div className="mr-3 flex-1">
            <div className="w-full">
              <button
                onClick={() => setIsDetectLanguageOpen(!isDetectLanguageOpen)}
                className="flex h-11 w-full items-center rounded-xl bg-neutral-50 px-3 hover:bg-neutral-100 @md:w-[240px] md:h-10"
              >
                <Earth className="text-blue-500 mr-2 inline-block size-5" />
                <span className="flex-1 text-left">
                  {detectedLanguage
                    ? `Detected: ${detectedLanguage}`
                    : "Detect language"}
                </span>
                <ChevronUp />
              </button>
            </div>
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
            placeholder="Type a reply..."
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
            <button className="text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors duration-200">
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionInput;
