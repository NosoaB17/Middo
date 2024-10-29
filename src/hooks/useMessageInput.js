import { useState, useRef, useEffect } from "react";
import { translateText } from "../services/translationService";
import debounce from "lodash/debounce";

export const useMessageInput = (onSendMessage) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [translatedMessage, setTranslatedMessage] = useState("");
  const [isDetectLanguageOpen, setIsDetectLanguageOpen] = useState(false);
  const [isESLToolOpen, setIsESLToolOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Language detection
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
    if (message.trim() && !isTranslating) {
      await onSendMessage({
        text: message,
        detectedLanguage,
        translatedText: translatedMessage || null,
      });
      setMessage("");
      setTranslatedMessage("");
      setDetectedLanguage("");
      setIsESLToolOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji) => {
    const start = inputRef.current?.selectionStart || 0;
    const end = inputRef.current?.selectionEnd || 0;
    const newMessage = message.slice(0, start) + emoji + message.slice(end);

    setMessage(newMessage);

    setTimeout(() => {
      const newCursor = start + emoji.length;
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(newCursor, newCursor);
    });
  };

  return {
    message,
    setMessage,
    showEmojiPicker,
    setShowEmojiPicker,
    detectedLanguage,
    translatedMessage,
    isDetectLanguageOpen,
    setIsDetectLanguageOpen,
    isESLToolOpen,
    setIsESLToolOpen,
    isFocused,
    setIsFocused,
    isTranslating,
    inputRef,
    fileInputRef,
    handleSend,
    handleKeyDown,
    handleEmojiSelect,
  };
};
