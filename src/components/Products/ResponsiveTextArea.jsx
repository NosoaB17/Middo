import React, { useRef, useState, useEffect } from "react";

const ResponsiveTextArea = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  minHeight = 120, // Chiều cao tối thiểu cho 3 dòng
  maxHeight = 500, // Chiều cao tối đa trước khi scroll
  initialFontSize = 22,
  minFontSize = 16,
}) => {
  const textareaRef = useRef(null);
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [areaHeight, setAreaHeight] = useState(minHeight);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    adjustTextArea();
  }, [value]);

  const adjustTextArea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset về trạng thái ban đầu để tính toán
    textarea.style.height = `${minHeight}px`;
    textarea.style.fontSize = `${initialFontSize}px`;
    setIsScrollable(false);

    const scrollHeight = textarea.scrollHeight;

    if (scrollHeight <= minHeight) {
      // Case 1: Text vừa với kích thước ban đầu
      setAreaHeight(minHeight);
      setFontSize(initialFontSize);
    } else if (scrollHeight <= maxHeight) {
      // Case 2: Text dài hơn, giảm font size
      let newFontSize = initialFontSize;
      textarea.style.height = "auto";

      while (textarea.scrollHeight > minHeight && newFontSize > minFontSize) {
        newFontSize--;
        textarea.style.fontSize = `${newFontSize}px`;
      }

      setFontSize(newFontSize);
      setAreaHeight(Math.min(textarea.scrollHeight, maxHeight));
    } else {
      // Case 3: Text rất dài, enable scroll
      setAreaHeight(maxHeight);
      setFontSize(minFontSize);
      setIsScrollable(true);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`
        w-full 
        bg-transparent 
        font-medium 
        text-neutral-600 
        leading-relaxed 
        outline-none 
        border-none 
        resize-none 
        transition-all 
        duration-200
        ${isScrollable ? "overflow-y-auto" : "overflow-hidden"}
      `}
      style={{
        fontSize: `${fontSize}px`,
        height: `${areaHeight}px`,
        minHeight: `${minHeight}px`,
        maxHeight: isScrollable ? `${maxHeight}px` : "none",
      }}
    />
  );
};

export default React.memo(ResponsiveTextArea);
