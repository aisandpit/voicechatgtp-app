import React from "react";
import "../App.css";

const CommandsList = ({ commands }) => {
  return (
    <div>
      <br />
      <div>
        <label className="fieldset-label">List Of Voice Commands</label>
      </div>
      <br />
      <div
        id="commandsListId"
        className="fieldset-commands-medium"
        style={{ whiteSpace: "pre-wrap" }} // Preserve line breaks and spaces
      >
        {commands.map((message, index) => {
          return `${index} - ${message.command}\n`;
        })}
      </div>
    </div>
  );
};

export default CommandsList;
