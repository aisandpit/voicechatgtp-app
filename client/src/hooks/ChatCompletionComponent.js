const ChatCompletionComponent = ({
  openai,
  modelVersion,
  messages,
  setResponseText,
  addSystemErrorMessage,
}) => {
  const createChatCompletion = async () => {
    console.log("createChatCompletion called");
    try {
      const responseRef = await openai.createChatCompletion({
        model: modelVersion,
        messages: messages,
        temperature: 0.7,
        max_tokens: 3000,
      });

      const openai_response =
        responseRef.data.choices[0].message.content.replace(/[\r\n]+/gm, "");
      setResponseText(openai_response);
    } catch (error) {
      console.error(
        "Error occurred while calling createChatCompletion:",
        error
      );

      addSystemErrorMessage("CreateChatCompletion", `Error ${error}`);
    }
  };

  return createChatCompletion();
};

export default ChatCompletionComponent;
