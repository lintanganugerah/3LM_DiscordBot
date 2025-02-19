const dotenv = require("dotenv");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { default: ollama } = require("ollama");
const config = require("./config/config");
const { fileCommand, deployCommand } = require("./commandIndex");
const path = require("path");
const { execute } = require("./command/chatLLM");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = "$!";

client.commands = new Collection();

fileCommand.map((fileName) => {
  const command = require(path.join(__dirname, "command", `${fileName}`));
  client.commands.set(command.data.name, command);
});

client.on("ready", async () => {
  console.log("Bot is ready");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "⚠ Terjadi kesalahan saat menjalankan command!",
    });
  }
});

// client.on("messageCreate", async (message) => {
//   if (message.author.bot) return;

//   // Jika pesan diawali dengan prefix $!
//   if (message.content.startsWith(prefix)) {
//     const args = message.content.slice(prefix.length).trim().split(/ +/);
//     const command = args.shift().toLowerCase();

//     // Jika command adalah 'chat'
//     if (command === "chat") {
//       await execute(message, args.join(" "));
//     }
//   }
// });

client.login(config.token);
