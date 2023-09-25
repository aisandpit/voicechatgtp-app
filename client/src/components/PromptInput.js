import React, { useEffect } from "react";
import "../App.css";

const PromptInput = ({ promptValue, setPromptValue, transcript }) => {
  // if (transcript.length > 0) {
  //   setPromptValue(
  //     transcript.charAt(0).toUpperCase() + transcript.slice(1) + "?"
  //   );
  // }

  useEffect(() => {
    if (transcript.length > 0) {
      setPromptValue(
        transcript.charAt(0).toUpperCase() + transcript.slice(1) + "?"
      );
    }
  }, [transcript, setPromptValue]);

  return (
    <textarea
      id="prompt"
      type="text"
      className="microphone-prompt-textarea"
      value={promptValue}
      readOnly
      placeholder="Say your prompt.."
    ></textarea>
  );
};

export default PromptInput;
