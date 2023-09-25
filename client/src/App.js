import { Configuration, OpenAIApi } from "openai";
import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
// import dotenv from "dotenv";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Microhone from "./components/Microphone";
import RequestHistory from "./components/RequestHistory";
import ResponseText from "./components/ResponseText";
import ResponseImage from "./components/ResponseImage";
import ChatHistoryList from "./components/ChatHistoryList";
import ControlButtonsPanel from "./components/ControlButtonsPanel";
import PromptInput from "./components/PromptInput";
import SystemRoleInput from "./components/SystemRoleInput";
import ModelsSelect from "./components/ModelsSelect";
import CompletionsSelect from "./components/CompletionsSelect";
import VoiceTypeSelect from "./components/VoiceTypeSelect";
import SpeechRateInput from "./components/SpeechRateInput";
import ErrorMessages from "./components/ErrorMessages";
import CommandsList from "./components/CommandsList";
import ConnectionStrengthComponent from "./components/ConnectionStrengthComponent";
import SpeechSynthesisManager from "./hooks/SpeechSynthesisManager";
import { v4 as uuidv4 } from "uuid";
import ChatAppStates from "./components/ChatAppStates";

import "./App.css";
// dotenv.config();
// const configuration = new Configuration({
//   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
// });
const configuration = new Configuration({
  apiKey: "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",
});
// console.log(
//   "process.env.OPENAI_API_KEY = ",
//   process.env.REACT_APP_OPENAI_API_KEY
// );

const openai = new OpenAIApi(configuration);

function App() {
  const microphoneRef = useRef(null);

  const [responseText, setResponseText] = useState("");
  const [responseURL, setResponseURL] = useState([]);

  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [voiceIndex, setVoiceIndex] = useState(1);
  const [voice, setVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.1);

  const [systemRole, setSystemRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(0);

  const [chatHistory, setChatHistory] = useState([]);
  const [modelVersion, setModelVersion] = useState("gpt-3.5-turbo");
  const [completions, setCompletions] = useState("Conversation");
  const [systemErrors, setSystemErrors] = useState([]);
  const [promptValue, setPromptValue] = useState("");
  const [verbose] = useState(false);
  const [commandMessage, setCommandMessage] = useState("");
  const [sysSpeechhUtterance, setSysSpeechhUtterance] = useState(null);
  const [chatHistorySummary, setChatHistorySummary] = useState([]);
  const [chatHistoryId, setChatHistoryId] = useState("");
  const [currentState, setCurrentState] = useState(ChatAppStates.NOT_LISTENING);

  const commands = [
    {
      command: "Reset".toLowerCase(),
      callback: () => {
        setCommandMessage("Reset transcript.");
        resetTranscript();
      },
    },
    {
      command: "Hide history".toLowerCase(),
      callback: () => {
        setCommandMessage("Hide History.");
        handleToggleChatHistory();
      },
    },
    {
      command: "New topic".toLowerCase(),
      callback: () => {
        setCommandMessage("New Topic.");
        handleNewTopic();
      },
    },
    {
      command: "Abort speaking".toLowerCase(),
      callback: () => {
        setCommandMessage("Abort speaking");
        handleAbortSpeech();
      },
    },
    {
      command: "Logout".toLowerCase(),
      callback: () => {
        setCommandMessage("Logout.");
        handleLogout();
      },
    },
  ];

  const {
    isMicrophoneAvailable,
    listening,
    transcript,
    finalTranscript,
    resetTranscript,
  } = useSpeechRecognition({ commands, clearTranscriptOnListen: true });

  const getDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const temp_month = now.getMonth() + 1;
    const month = temp_month < 10 ? `0${temp_month}` : `${temp_month}`;
    const temp_day = now.getDate();
    const day = temp_day < 10 ? `0${temp_day}` : `${temp_day}`;
    const temp_hour = now.getHours();
    const hour = temp_hour < 10 ? `0${temp_hour}` : `${temp_hour}`;
    const temp_minute = now.getMinutes();
    const minute = temp_minute < 10 ? `0${temp_minute}` : `${temp_minute}`;
    const temp_second = now.getSeconds();
    const second = temp_second < 10 ? `0${temp_second}` : `${temp_second}`;
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  };

  const getDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const temp_month = now.getMonth() + 1;
    const month = temp_month < 10 ? `0${temp_month}` : `${temp_month}`;
    const temp_day = now.getDate();
    const day = temp_day < 10 ? `0${temp_day}` : `${temp_day}`;
    return `${day}-${month}-${year}`;
  };

  const getUUID = () => {
    return uuidv4();
  };

  const addChatHistory = (id, persona, role, content, dataType = "text") => {
    const message = {
      id: id,
      persona: persona,
      role: role,
      content: content.charAt(0).toUpperCase() + content.slice(1),
      data: dataType,
      date: getDateTime(),
    };

    setChatHistory((prevChartHistory) => {
      return [...prevChartHistory, message];
    });
  };

  const getChatHistory = (persona, count = 10, dataType = "text") => {
    const lastMessages = [...chatHistory].slice(-10);
    return lastMessages;
  };

  // const getLastChatHistory = (roleType) => {
  //   const userRows = chatHistory.filter((message) => message.role === roleType);
  //   if (userRows.length > 0) {
  //     return userRows[userRows.length - 1];
  //   }
  //   return null; // Return null if no user rows found
  // };

  // const isTodayExistsChatHistory = (roleType) => {
  //   const todayDate = getDate();
  //   return chatHistory.some(
  //     (message) => message.role === roleType && message.date.includes(todayDate)
  //   );
  // };

  const clearChatHistory = () => {
    setChatHistory([]);
  };

  const addSystemError = (appCompnent, message) => {
    const tempSystemErrors = {
      name: appCompnent,
      details: message,
    };

    setSystemErrors((prevSystemErrors) => {
      return [...prevSystemErrors, tempSystemErrors];
    });
  };

  const fetchData = async () => {
    try {
      const response1 = await fetch("http://localhost:5000/systemRole");
      const systemRoleData = await response1.json();
      setSystemRole(systemRoleData);

      const response2 = await fetch("http://localhost:5000/chatHistory");
      const chatHistoryData = await response2.json();
      setChatHistory(chatHistoryData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const uuid = getUUID();
    console.log("handleNewTopic =", uuid);
    setChatHistoryId(uuid);

    console.log("useEffect: fetchData complete");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveChatHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/systemRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(systemRole),
      });

      if (response.ok) {
        console.log("System role saved successfully!");
      } else {
        console.error("Error saving system role:", response.status);
      }
    } catch (error) {
      console.error("Error saving system role:", error);
    }

    try {
      const response = await fetch("http://localhost:5000/chatHistory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatHistory),
      });

      if (response.ok) {
        console.log("Chat history saved successfully!");
      } else {
        console.error("Error saving chat history:", response.status);
      }
    } catch (error) {
      console.error("Error saving chat history:", error);
    }

    console.log("useEffect: post complete");
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveChatHistory();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;

    if (!voicesLoaded) {
      if (verbose)
        console.log("useEffect: onVoicesChanged voicesLoaded =", voicesLoaded);

      const onVoicesChanged = () => {
        if (verbose) console.log("useEffect: onVoicesChanged");
        const voicesList = speechSynthesis.getVoices();
        const tempVoices = voicesList.map((voiceType, index) => ({
          index,
          name: voiceType.name,
        }));

        setVoices(tempVoices);
        const googleVoice = voicesList[voiceIndex];

        if (googleVoice && !voicesLoaded && voice === null) {
          setSysSpeechhUtterance(
            (utterance) => new window.SpeechSynthesisUtterance()
          );
          setVoice(googleVoice);
          setVoicesLoaded(true);
          setSpeaking(false);
        }
      };

      speechSynthesis.onvoiceschanged = onVoicesChanged;

      return () => {
        speechSynthesis.onvoiceschanged = null;
      };
    }
  }, [voicesLoaded, verbose, voiceIndex, voice]);

  const handleStopListening = useCallback(() => {
    // Stop listening logic
    window.speechSynthesis.cancel(sysSpeechhUtterance);

    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  }, [sysSpeechhUtterance]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createMessages = useCallback(
    (userRole, chatHistory, finalTranscript) => {
      let messages;

      if (chatHistory.length === 0) {
        messages = [
          {
            role: userRole.role,
            content: userRole.content,
          },
          { role: "user", content: finalTranscript },
        ];
      } else {
        const last10Messages = getChatHistory(userRole.nameCode, 10);
        messages = [
          {
            role: userRole.role,
            content: userRole.content,
          },
          ...last10Messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
          { role: "user", content: finalTranscript },
        ];
      }

      return messages;
    }
  );

  useEffect(() => {
    const handleTranscript = async () => {
      if (verbose) console.log("useEffect: handleTranscript called");

      let openai_response = null;
      const userRole = systemRole[selectedRole];
      setCurrentState(ChatAppStates.RESPONDING);

      const commonOptions = {
        model: modelVersion,
        temperature: 0.7,
        max_tokens: 3000,
      };

      try {
        switch (completions) {
          case "Completion":
            const completionOptions = {
              ...commonOptions,
              prompt: finalTranscript,
            };
            const completionResponseRef = await openai.createCompletion(
              completionOptions
            );
            openai_response =
              completionResponseRef.data.choices[0].message.content.replace(
                /[\r\n]+/gm,
                ""
              );
            break;

          case "Conversation":
            const messages = createMessages(
              userRole,
              chatHistory,
              finalTranscript
            );
            if (verbose) console.log("prompt messages: ", messages);

            const chatCompletionOptions = {
              ...commonOptions,
              messages: messages,
            };
            const conversationResponseRef = await openai.createChatCompletion(
              chatCompletionOptions
            );
            // openai_response =
            //   conversationResponseRef.data.choices[0].message.content.replace(
            //     /[\r\n]+/gm,
            //     ""
            //   );
            openai_response =
              conversationResponseRef.data.choices[0].message.content;
            console.log("openai_response =", openai_response);
            break;

          case "ImageGeneration":
            const imageOptions = {
              prompt: finalTranscript,
              n: 2,
              size: "256x256",
            };
            const imageGenerationResponseRef = await openai.createImage(
              imageOptions
            );
            openai_response = imageGenerationResponseRef.data.data;
            break;

          default:
            // Handle invalid completions value
            break;
        }

        if (openai_response) {
          if (completions === "ImageGeneration") {
            setResponseURL(openai_response);
            setResponseText("This is the image you requested");
            const image_url = openai_response.map(
              (message, index) => `URL - ${index + 1} : ${message.url}\n`
            );
            addChatHistory(chatHistoryId, "assistant", image_url, "image");
          } else {
            setResponseText(openai_response);
            addChatHistory(
              chatHistoryId,
              userRole.nameCode,
              "user",
              promptValue
            );
            addChatHistory(
              chatHistoryId,
              userRole.nameCode,
              "assistant",
              openai_response
            );
          }
        }
      } catch (error) {
        console.error("Error occurred:", error);
        const errorMessage = `Error ${error}`;
        if (completions === "Completion") {
          addSystemError("CreateCompletion", errorMessage);
        } else if (completions === "Conversation") {
          addSystemError("CreateChatCompletion", errorMessage);
        } else if (completions === "ImageGeneration") {
          // Handle image generation error
        }
      }

      handleStopListening();
    };

    // Rest of the code...

    if (commandMessage === "" && finalTranscript !== "") {
      handleTranscript();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalTranscript]);

  const handleModelVersionChange = (value) => {
    // if (verbose) console.log("handleModelVersionChange called value = ", value);
    setModelVersion(value);
  };

  const handleChatTypeChange = (value) => {
    // if (verbose) console.log("handleChatTypeChange called value = ", value);
    setCompletions(value);
  };

  const handleVoiceTypeChange = (value) => {
    // if (verbose) console.log("handleVoiceTypeChange value = ", value);
    setVoiceIndex(value);

    const speechSynthesis = window.speechSynthesis;
    const googleVoice = speechSynthesis.getVoices()[value];
    setVoice(googleVoice);
  };

  const handleSliderChange = (value) => {
    // if (verbose) console.log("handleSliderChange called = ", value);
    setSpeechRate(value);
  };

  const handleStartListeningReset = useCallback(() => {
    resetTranscript();
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({ continuous: true });
  }, [resetTranscript]);

  const handleStartListening = () => {
    // if (verbose) console.log("handleStartListening called");

    if (isMicrophoneAvailable) {
      microphoneRef.current.classList.add("listening");
      SpeechRecognition.startListening({ continuous: true });
    } else {
      console.error("Microphone not Available");
      addSystemError("Microphone", "Microphone not Available");
    }
  };

  const handleAbortSpeech = () => {
    if (verbose) console.log("handleAbortSpeech called");
    handleStopListening();
    setPromptValue("");
    setResponseText("");
    setCommandMessage("");
    resetTranscript();
  };

  const handleReset = () => {
    // if (verbose) console.log("handleReset called");
    handleStopListening();
    setPromptValue("");
    setResponseText("");
    setCommandMessage("");
    if (completions === "ImageGeneration") {
      setResponseURL([]);
    }
    resetTranscript();
  };

  const handleLogout = () => {
    // if (verbose) console.log("handleLogout called");
    saveChatHistory();
    window.close();
  };

  const handleRoleChange = (event) => {
    const selectedNameCode = event.target.value;
    const selectedIndex = systemRole.findIndex(
      (role) => role.nameCode === selectedNameCode
    );
    setSelectedRole(selectedIndex);
  };

  const handleNewTopic = () => {
    saveChatHistory();
    clearChatHistory();
    const uuid = getUUID();
    console.log("handleNewTopic = ", uuid);
    setChatHistoryId(uuid);
  };

  const handleToggleChatHistory = (event) => {
    let clickedElement = event.target;
    console.log("clickedElement = ", clickedElement);

    if (clickedElement.textContent === "Show History") {
      clickedElement.textContent = "Hide History";
    } else {
      clickedElement.textContent = "Show History";
    }

    const chatHistoryElement = document.getElementById("chatHistoryId");
    chatHistoryElement.style.display =
      chatHistoryElement.style.display === "none" ? "block" : "none";
  };

  const handleSpeechError = (error) => {
    addSystemError("SpeechSynthesisManager", `Error ${error}`);
  };

  const chatHistorySummaryArray = useMemo(() => {
    const tempHistorySummary = {};

    for (const message of chatHistory) {
      if (message.role === "user") {
        const date = message.date.split(" ")[0];
        if (!tempHistorySummary[date]) {
          tempHistorySummary[date] = {
            id: message.id,
            content: message.content,
          };
        }
      }
    }

    const resultArray = Object.entries(tempHistorySummary).map(
      ([date, summary]) => ({
        id: summary.id,
        date,
        content: summary.content,
      })
    );

    return resultArray;
  }, [chatHistory]);

  useEffect(() => {
    if (
      chatHistorySummaryArray.length > 0 &&
      chatHistorySummaryArray[chatHistorySummaryArray.length - 1].date <=
        getDate()
    ) {
      setChatHistorySummary((prevChatHistorySummary) => {
        const newChatHistorySummary = [...prevChatHistorySummary];

        chatHistorySummaryArray.forEach((item) => {
          const existingItemIndex = newChatHistorySummary.findIndex(
            (existingItem) => existingItem.date === item.date
          );

          if (existingItemIndex === -1) {
            newChatHistorySummary.push(item);
          }
        });

        console.log("newChatHistorySummary generated");
        return newChatHistorySummary;
      });
    }
  }, [chatHistorySummaryArray]);

  useEffect(() => {
    if (listening) {
      setCurrentState(ChatAppStates.LISTENING);
    } else if (window.speechSynthesis.speaking) {
      setCurrentState(ChatAppStates.SPEAKING);
    } else {
      setCurrentState(ChatAppStates.NOT_LISTENING);
    }
  }, [listening]);

  if (
    systemRole.length === 0 ||
    chatHistory.length === 0 ||
    chatHistorySummary.length === 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SpeechSynthesisManager
        speaking={speaking}
        responseText={responseText}
        voice={voice}
        speechRate={speechRate}
        handleStartListeningReset={handleStartListeningReset}
        handleSpeechError={handleSpeechError}
        sysSpeechhUtterance={sysSpeechhUtterance}
      />
      <div className="main-container">
        <div className="left-sidebar-container">
          <div className="fieldset-container">
            <div className="controls-container-vertical">
              <RequestHistory chatHistorySummary={chatHistorySummary} />
            </div>
            <div>
              <CommandsList commands={commands} />
            </div>
          </div>
        </div>
        <div className="content-container">
          <div className="microphone-wrapper">
            <Microhone
              microphoneRef={microphoneRef}
              listening={listening}
              currentState={currentState}
              handleStartListening={handleStartListening}
              handleStopListening={handleStopListening}
            />
            <div className="prompt-container">
              <PromptInput
                promptValue={
                  commandMessage === "" ? promptValue : commandMessage
                }
                setPromptValue={setPromptValue}
                transcript={transcript}
              />
              {completions === "ImageGeneration" ? (
                <ResponseImage
                  promptValue={promptValue}
                  responseURL={responseURL}
                  responseText={responseText}
                />
              ) : (
                <ResponseText responseText={responseText} />
              )}
              <ChatHistoryList chatHistory={chatHistory} />
            </div>
            <div className="controls-container">
              <ControlButtonsPanel
                handleNewTopic={handleNewTopic}
                handleAbortSpeech={handleAbortSpeech}
                handleReset={handleReset}
                handleLogout={handleLogout}
                handleToggleChatHistory={handleToggleChatHistory}
              />
            </div>
          </div>
        </div>
        <div className="sidebar-container">
          <div className="fieldset-container">
            <SystemRoleInput
              systemRole={systemRole}
              handleRoleChange={handleRoleChange}
              selectedRole={selectedRole}
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
            <ConnectionStrengthComponent />
            <ErrorMessages systemErrors={systemErrors} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
