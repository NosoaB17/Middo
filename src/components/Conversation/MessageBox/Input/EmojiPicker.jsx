import { useRef, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiPicker = ({ onEmojiSelect, onClose, position = "bottom" }) => {
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={pickerRef}
      className="
      fixed right-0 bottom-0 -translate-x-5 -translate-y-[100px] min-w-max z-[50]"
    >
      <Picker
        data={data}
        onEmojiSelect={(emoji) => {
          onEmojiSelect(emoji.native);
          onClose();
        }}
        theme="light"
        set="native"
        skinTonePosition="none"
        previewPosition="none"
        navPosition="top"
        categories={[
          "frequent",
          "people",
          "nature",
          "food",
          "activity",
          "places",
          "objects",
          "symbols",
          "flags",
        ]}
        perLine={8}
        maxFrequentRows={1}
        emojiSize={20}
        emojiButtonSize={28}
        showPreview={false}
        showSkinTones={false}
        autoFocus={false}
      />
    </div>
  );
};

export default EmojiPicker;
