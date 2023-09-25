import { useEffect } from "react";

const SpeechSynthesisManager = ({
  speaking,
  responseText,
  voice,
  speechRate,
  handleStartListeningReset,
  handleSpeechError,
  sysSpeechhUtterance,
}) => {
  function speakSentences(
    voice,
    responseText,
    callback,
    updateSpeechRate,
    speechhUtterance
  ) {
    return new Promise((resolve, reject) => {
      try {
        const speechSynthesis = window.speechSynthesis;

        const sentences = responseText
          .split(/(?<!\d\.\d)(?<=\.|\?)\s/)
          .map((responseText) => responseText.trim() + ".");

        let currentIndex = 0;

        const speakNextSentence = () => {
          if (currentIndex < sentences.length) {
            speechhUtterance.voice = voice;
            speechhUtterance.rate = updateSpeechRate;

            speechhUtterance.onend = () => {
              currentIndex++;
              if (currentIndex < sentences.length) {
                speakNextSentence();
              } else {
                if (callback) {
                  callback(); // Call the callback function if it exists
                }
              }
            };

            speechhUtterance.text = `${sentences[currentIndex]}`.trim();
            speechSynthesis.speak(speechhUtterance);
          } else {
            resolve();
          }
        };
        speakNextSentence();
      } catch (error) {
        reject(error); // Reject the promise with the reported error
      }
    });
  }

  useEffect(() => {
    if (!speaking && responseText) {
      const callback = () => {
        handleStartListeningReset();
      };
      speakSentences(
        voice,
        responseText,
        callback,
        speechRate,
        sysSpeechhUtterance
      ).catch((error) => {
        handleSpeechError(error); // Pass the reported error to the error handler in App.js
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speaking, responseText, voice, handleStartListeningReset, speechRate]);

  return null;
};

export default SpeechSynthesisManager;
