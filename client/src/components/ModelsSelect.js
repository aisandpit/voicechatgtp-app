import React from "react";
import "../App.css";

const ModelsSelect = ({ modelVersion, handleModelVersionChange }) => {
  const handleChange = (event) => {
    handleModelVersionChange(event.target.value);
  };

  return (
    <div>
      <label className="fieldset-label">Models</label>
      <select
        className="fieldset-select"
        value={modelVersion}
        onChange={handleChange}
        style={{ backgroundColor: "black", color: "cyan" }}
      >
        <option value="gpt-3.5-turbo">Gtp-3.5-Turbo</option>
        <option value="text-davinci-003">Text-Davinci-003</option>
      </select>
    </div>
  );
};

export default ModelsSelect;
