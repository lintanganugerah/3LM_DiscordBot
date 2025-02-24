const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test Bot Interaction. Pong!"),
  async execute(interaction) {
    await interaction.reply("PONG!");
  },
};
