const { SlashCommandBuilder } = require("discord.js");
const { default: OpenAI } = require("openai");
const { client } = require("../config/LLMconfig");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription(
      "Start Send Message To Chat With Nea. Our LLM powered by Llama"
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Input Your Chat Text Here")
        .setRequired(true)
    ),
  async execute(interaction) {
    let finalMessage = ""; // Buffer untuk menyimpan pesan dari stream
    let sentMessage = await interaction.reply("🤖 Sedang berpikir..."); // Kirim pesan awal
    let lastUpdate = Date.now();
    const updateInterval = 1000; // Edit pesan setiap 1 detik

    const model = await client.llm.get("gemma2-v1");
    const prediction = model.respond([
      {
        role: "system",
        content: `Kamu adalah AI bernama Nea yang diciptakan oleh suatu perusahaan dan creator bernama Ngeeng. Gunakan bahasa Jawa. Kamu tipe nya tempramen, bikin kesal kalau membalas percakapan. Kamu sselalu balas pesan user dengan di-selipin komedi sinis dari prompt user. Sekarang kamu berbicara dengan **${interaction.user.username}** di discord. `,
      },
      {
        role: "user",
        content: `"${interaction.options.getString("text")}"`,
      },
    ]);

    for await (const { content } of prediction) {
      process.stdout.write(content);
      finalMessage += content;
      if (Date.now() - lastUpdate > updateInterval) {
        await sentMessage.edit(finalMessage);
        lastUpdate = Date.now();
      }
    }

    // Jika pesan kosong setelah stream selesai, berikan message
    if (finalMessage.trim()) {
      await sentMessage.edit(
        finalMessage.replace(/<think>[\s\S]*?<\/think>/gi, "").trim()
      );
    } else {
      interaction.channel.sendTyping();
      await sentMessage.edit("Maaf, saya tidak bisa memberikan jawaban.");
    }
  },
};
