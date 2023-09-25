import React from "react";
import "../App.css";
import microPhoneIcon from "../microphone.svg";
import ChatAppStates from "./ChatAppStates";

const Microphone = ({
  microphoneRef,
  listening,
  currentState,
  handleStartListening,
  handleStopListening,
}) => {
  // console.log("Microphone currentState = ", currentState);
  // console.log("Microphone listening = ", listening);
  // console.log(
  //   "App window.speechSynthesis.speaking)= ",
  //   window.speechSynthesis.speaking
  // );

  return (
    <div className="mircophone-container">
      <div
        className="microphone-icon-container"
        ref={microphoneRef}
        onClick={handleStartListening}
      >
        <img src={microPhoneIcon} className="microphone-icon" alt="" />
      </div>
      {currentState === ChatAppStates.NOT_LISTENING && (
        <div className="microphone-status">
          <p className="microphone-status-off">Click to Listen</p>
        </div>
      )}
      {currentState === ChatAppStates.LISTENING && (
        <div className="microphone-status">
          <p className="microphone-status-on">Listening.........</p>
        </div>
      )}
      {currentState === ChatAppStates.RESPONDING && (
        <div className="microphone-status">
          <p className="microphone-status-off">Responding.......</p>
        </div>
      )}
      {currentState === ChatAppStates.SPEAKING && (
        <div className="microphone-status">
          <p className="microphone-status-off">Speaking.........</p>
        </div>
      )}

      {/* <div className="microphone-status">
        {listening ? (
          <p className="microphone-status-on">Listening.........</p>
        ) : (
          <p className="microphone-status-off">Click to start Listening</p>
        )}
      </div> */}
      {listening && (
        <button
          className="microphone-control btn"
          onClick={handleStopListening}
        >
          Stop
        </button>
      )}
    </div>
  );

  // return (
  //   <div className="mircophone-container">
  //     <div
  //       className="microphone-icon-container"
  //       ref={microphoneRef}
  //       onClick={handleStartListening}
  //     >
  //       <img src={microPhoneIcon} className="microphone-icon" alt="" />
  //     </div>
  //     <div className="microphone-status">
  //       {listening ? (
  //         <p className="microphone-status-on">Listening.........</p>
  //       ) : (
  //         <p className="microphone-status-off">Click to start Listening</p>
  //       )}
  //     </div>
  //     {listening && (
  //       <button
  //         className="microphone-control btn"
  //         onClick={handleStopListening}
  //       >
  //         Stop
  //       </button>
  //     )}
  //   </div>
  // );
};

export default Microphone;
