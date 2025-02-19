require("dotenv").config();

module.exports = {
  token: process.env.TOKEN,
  clientId: process.env.CLIENT_ID,
  botName: process.env.BOT_NAME,
  BaseGuildId: process.env.BASE_GUILD_ID,
};
