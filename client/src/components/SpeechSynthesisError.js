import React from "react";

const SpeechSynthesisError = ({ systemErrors }) => {
  return (
    <div>
      {systemErrors.map((error, index) => (
        <div key={index}>
          <p>{error.name}</p>
          <p>{error.details}</p>
        </div>
      ))}
    </div>
  );
};

export default SpeechSynthesisError;
