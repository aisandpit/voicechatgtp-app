import { useState } from "react";

const useArray = (defaultValue) => {
  const [chatHistory, setChatHistory] = useState(defaultValue);

  function add(element) {
    setChatHistory((a) => [...a, element]);
  }

  function filter(callback) {
    setChatHistory((a) => a.filter(callback));
  }

  function remove(index) {
    setChatHistory((a) => [
      ...a.slice(0, index),
      ...a.slice(index + 1, a.length),
    ]);
  }

  function clear() {
    setChatHistory([]);
  }

  return { chatHistory, set: setChatHistory, add, filter, remove, clear };
};

export default useArray;
