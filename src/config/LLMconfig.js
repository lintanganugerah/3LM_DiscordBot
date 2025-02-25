const { LMStudioClient } = require("@lmstudio/sdk");

const client = new LMStudioClient({
  baseUrl: "wss:llm.ngeengz.eu",
});

module.exports = client;
