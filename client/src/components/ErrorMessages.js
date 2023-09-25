import React from "react";
import "../App.css";

const ErrorMessages = ({ systemErrors }) => {
  return (
    <div>
      <label className="fieldset-label">Error Messages</label>
      <textarea
        id="systemError"
        type="text"
        className="fieldset-error-messages"
        readOnly
        value={systemErrors
          .map(
            (message, index) =>
              `${index + 1}: ${message.name} - ${message.details}\n\n`
          )
          .join("")
          .replace(/,/g, "")}
      />
    </div>
  );
};

export default ErrorMessages;
