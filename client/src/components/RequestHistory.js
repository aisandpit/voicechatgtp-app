import React, { useState } from "react";
import "../App.css";

const RequestHistory = ({ chatHistorySummary }) => {
  const [selectedButton, setSelectedButton] = useState("");

  function handleButtonClick(id) {
    console.log(`Button ${id} clicked!`);
    setSelectedButton(id);
    console.log("selectedButton = ", selectedButton);
  }

  return (
    <div>
      <div>
        <label className="fieldset-label">Previous Topics</label>
      </div>
      <br />
      <div className="scroll-container">
        {chatHistorySummary
          .slice()
          //.reverse()
          .map((message) => (
            <div key={message.date}>
              <label className="fieldset-label">{message.date}</label>
              <button
                id={message.id}
                className="scroll-button"
                onClick={() => handleButtonClick(message.id)}
              >
                {message.content}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RequestHistory;
