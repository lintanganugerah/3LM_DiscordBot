const { registerCommand } = require("./commandIndex");
const loadLLM = require("./loadLLM");

// Ambil function name dari argument command line
const functionName = process.argv[2];
const category = process.argv[3];

if (category == "command") {
  registerCommand(functionName);
} else if (category == "llmLoad") {
  llmLoad(functionName);
} else if (category == "load") {
  loadLLM.selectModel();
} else if (category == "model") {
  loadLLM.getModel().then((model) => console.log(model));
}
