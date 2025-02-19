const { registerCommand } = require("../commandIndex");
const { llama3Instruct1b, qwen2_5_7b } = require("./LLMconfig");

// Ambil function name dari argument command line
const functionName = process.argv[2];
const category = process.argv[3];

console.log(category);

if (category == "command") {
  registerCommand(functionName);
} else if (category == "llmstart") {
  llama3Instruct1b();
} else if (category == "qwen2_5_7b") {
  qwen2_5_7b();
}
