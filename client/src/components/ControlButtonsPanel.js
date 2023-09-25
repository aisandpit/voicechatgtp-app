import "../App.css";

const ControlButtonsPanel = ({
  handleAbortSpeech,
  handleReset,
  handleLogout,
  handleNewTopic,
  handleToggleChatHistory,
}) => {
  return (
    <div>
      <button className="button" onClick={handleToggleChatHistory}>
        <span>Hide History</span>
      </button>
      <button className="button" onClick={handleNewTopic}>
        New Topic
      </button>
      <button id="abort" className="button" onClick={handleAbortSpeech}>
        Abort speaking
      </button>
      <button className="button" onClick={handleReset}>
        Reset
      </button>
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ControlButtonsPanel;
