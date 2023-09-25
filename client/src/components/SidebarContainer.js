import React from "react";
import SystemRoleInput from "./SystemRoleInput";
import ModelsSelect from "./ModelsSelect";
import CompletionsSelect from "./CompletionsSelect";
import VoiceTypeSelect from "./VoiceTypeSelect";
import SpeechRateInput from "./SpeechRateInput";
import ErrorMessages from "./ErrorMessages";
import "../App.css";

const SidebarContainer = ({
  systemRole,
  setSystemRole,
  modelVersion,
  handleModelVersionChange,
  completions,
  handleChatTypeChange,
  voices,
  voiceIndex,
  handleVoiceTypeChange,
  speechRate,
  handleSliderChange,
  systemErrors,
}) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-container">
        <SystemRoleInput
          systemRole={systemRole}
          setSystemRole={setSystemRole}
        />
        <ModelsSelect
          modelVersion={modelVersion}
          handleModelVersionChange={handleModelVersionChange}
        />
        <CompletionsSelect
          completions={completions}
          handleChatTypeChange={handleChatTypeChange}
        />
        <VoiceTypeSelect
          voices={voices}
          voiceIndex={voiceIndex}
          handleVoiceTypeChange={handleVoiceTypeChange}
        />
        <SpeechRateInput
          speechRate={speechRate}
          handleSliderChange={handleSliderChange}
        />
        <ErrorMessages systemErrors={systemErrors} />
      </div>
    </div>
  );
};

export default SidebarContainer;
