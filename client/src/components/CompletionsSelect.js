import React from "react";

const CompletionsSelect = ({ completions, handleChatTypeChange }) => {
  const handleChange = (event) => {
    handleChatTypeChange(event.target.value);
  };

  return (
    <div>
      <label className="fieldset-label">Completions</label>
      <select
        className="fieldset-select"
        value={completions}
        onChange={handleChange}
        style={{ backgroundColor: "black", color: "cyan" }}
      >
        <option value="Conversation">Conversation</option>
        <option value="Completion">Completion</option>
      </select>
    </div>
  );
};

export default CompletionsSelect;
