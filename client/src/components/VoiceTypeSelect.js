import React from "react";
import "../App.css";

const VoiceTypeSelect = ({ voices, voiceIndex, handleVoiceTypeChange }) => {
  const handleChange = (event) => {
    handleVoiceTypeChange(event.target.value);
  };

  return (
    <div>
      <label className="fieldset-label">Voices Type</label>
      <select
        className="fieldset-select"
        onChange={handleChange}
        value={voiceIndex}
        style={{ backgroundColor: "black", color: "cyan" }}
      >
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            {voice.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VoiceTypeSelect;
