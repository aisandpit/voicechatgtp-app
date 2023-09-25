const acorn = require("acorn");

const CodeSynthesisManager = ({
  responseText,
  setResponseText,
  handleStartListeningReset,
}) => {
  const ast = acorn.parse(responseText, {
    ecmaVersion: 2020,
    sourceType: "module",
  });

  async function traverse(node, depth = 0) {
    console.log(`${" ".repeat(depth * 2)}Type: ${node.type}`);
    for (const key in node) {
      if (
        key !== "type" &&
        typeof node[key] === "object" &&
        node[key] !== null
      ) {
        if (Array.isArray(node[key])) {
          console.log(`${" ".repeat(depth * 2)}${key}: [`);
          node[key].forEach((item) => traverse(item, depth + 1));
          console.log(`${" ".repeat(depth * 2)}]`);
        } else {
          console.log(`${" ".repeat(depth * 2)}${key}: {`);
          traverse(node[key], depth + 1);
          console.log(`${" ".repeat(depth * 2)}}`);
        }
      }
    }
  }
  (async () => {
    await traverse(ast);
  })();

  handleStartListeningReset();

  return null;
};

export default CodeSynthesisManager;
