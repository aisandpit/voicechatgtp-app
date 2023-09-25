import React from "react";
import "../App.css";

const SpeechRateInput = ({ speechRate, handleSliderChange }) => {
  const handleChange = (event) => {
    handleSliderChange(event.target.value);
  };

  return (
    <div>
      <label className="fieldset-label">Speech rate : {speechRate}</label>
      <input
        className="fieldset-select"
        type="range"
        min="0.1"
        max="10.0"
        step="0.1"
        value={speechRate}
        onChange={handleChange}
      />
    </div>
  );
};

export default SpeechRateInput;
