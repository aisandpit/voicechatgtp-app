const ChatResponseComponent = ({ response, setResponseText }) => {
  const processResponse = () => {
    if (response) {
      setResponseText(response);
    }
  };

  processResponse();

  return null;
};

export default ChatResponseComponent;
