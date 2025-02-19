const { LMStudioClient } = require("@lmstudio/sdk");

const client = new LMStudioClient();

const llama3Instruct1b = async () => {
  try {
    await client.llm.load(
      "hugging-quants/Llama-3.2-1B-Instruct-Q8_0-GGUF/llama-3.2-1b-instruct-q8_0.gguf",
      {
        noHup: true,
        verbose: false, // Disables the default progress logging
        identifier: "llama3Instruct1b",
        onProgress: (progress) => {
          console.log(`Progress: ${(progress * 100).toFixed(1)}%`);
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
const qwen2_5_7b = async () => {
  try {
    await client.llm.load("lmstudio-community/Qwen2.5-7B-Instruct-1M-GGUF", {
      noHup: true,
      verbose: false, // Disables the default progress logging
      identifier: "qwen2.5-7b-instruct-1m",
      onProgress: (progress) => {
        console.log(`Progress: ${(progress * 100).toFixed(1)}%`);
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { client, llama3Instruct1b, qwen2_5_7b };
