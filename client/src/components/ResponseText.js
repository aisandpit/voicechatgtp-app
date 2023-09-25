import React, { useRef, useEffect } from "react";
import "../App.css";

const ResponseText = ({ responseText }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (textareaRef.current) {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [responseText]);

  return (
    <textarea
      ref={textareaRef}
      id="responseId"
      type="text"
      className="microphone-result-textarea"
      readOnly
      placeholder="Response placeholder.."
      value={responseText}
    />
  );
};

export default ResponseText;
