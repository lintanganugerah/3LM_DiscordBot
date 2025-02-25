require("module-alias/register");
const client = require("@config/LLMconfig");
const readline = require("readline");
const { v4: uuidv4 } = require("uuid");

async function input(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

const getModel = async () => {
  const downloadedModels = await client.system.listDownloadedModels();
  const downloadedLLMs = downloadedModels.filter(
    (model) => model.type === "llm"
  );
  return downloadedLLMs;
};

async function selectModel() {
  const models = await getModel();

  console.log("Berikut adalah daftar model yang ada: \n");
  models.forEach((model, index) => {
    console.log(`${index}. ${model.path}`);
  });

  const nomorModel = await input("\nMasukkan Nomor Model: ");
  const selectedModel = models[nomorModel];
  console.log(selectedModel);

  llmLoad(selectedModel);
}

//TODO: Masih Error dari SDK nya belum support. Model Key required, padahal tidak ada model key
const llmLoad = async (
  model = {
    path: "lmstudio-community/Qwen2.5-7B-Instruct-1M-GGUF/Qwen2.5-7B-Instruct-1M-Q4_K_M.gguf",
    modelKey: "Qwen2.5-7B-Instruct-1M", // Tambahkan modelKey yang sesuai
  }
) => {
  try {
    await client.llm.load(model.path, {
      modelKey: "Qwen2.5-7B-Instruct-1M", // Sertakan modelKey di sini
      noHup: true,
      verbose: false, // Menonaktifkan logging progres default
      identifier: uuidv4(),
      onProgress: (progress) => {
        console.log(`Progres: ${(progress * 100).toFixed(1)}%`);
      },
    });
  } catch (error) {
    console.error("Gagal memuat model:", error);
  }
};

module.exports = { getModel, selectModel };
