import Microhone from "./Microphone";
import PromptInput from "./PromptInput";
import ResponseText from "./ResponseText";
import ControlButtonsPanel from "./ControlButtonsPanel";
import "../App.css";

const ContentContainer = ({
  microphoneRef,
  listening,
  handleStartListening,
  handleStopListening,
  promptValue,
  handleTranscriptChange,
  transcript,
  responseText,
  chatHistory,
  handleToggleChatHistory,
  handleAbortSpeech,
  handleReset,
  handleLogout,
}) => {
  console.log("ContentContainer = transcript =", transcript);
  return (
    <div className="content-container">
      <div className="microphone-wrapper">
        <div className="mircophone-container">
          <Microhone
            microphoneRef={microphoneRef}
            listening={listening}
            handleStartListening={handleStartListening}
            handleStopListening={handleStopListening}
          />
        </div>
        <div className="microphone-result-container">
          <PromptInput
            promptValue={promptValue}
            handleTranscriptChange={handleTranscriptChange}
            transcript={transcript}
          />
          <ResponseText responseText={responseText} />
          {/* <ChatHistoryList chatHistory={chatHistory} /> */}
          <ControlButtonsPanel
            handleToggleChatHistory={handleToggleChatHistory}
            handleAbortSpeech={handleAbortSpeech}
            handleReset={handleReset}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentContainer;
