import React, { useRef, useEffect } from "react";
import "../App.css";

const ChatHistoryList = ({ chatHistory }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (textareaRef.current) {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [chatHistory]);

  return (
    <textarea
      ref={textareaRef}
      id="chatHistoryId"
      type="text"
      className="microphone-chathistory-textarea"
      readOnly
      placeholder="Conversation history.."
      value={chatHistory
        .map((message, index) => {
          const nextLine = index % 2 === 0 ? true : false;
          const formattedRole = `${message.role}`;
          if (nextLine) {
            return `${message.date}\n${formattedRole} : ${message.content}\n`;
          } else {
            return `${formattedRole} : ${message.content}\n\n`;
          }
        })
        .join("")
        .replace(/,/g, "")}
    />
  );
};

export default ChatHistoryList;
