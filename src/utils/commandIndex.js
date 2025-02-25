require("module-alias/register");

const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("@config/config");

const listCommand = [];
const commandPath = path.join(__dirname, "../commands");
const fileCommand = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".js"));

fileCommand.map((fileName) => {
  const command = require(path.join(__dirname, "../commands", `${fileName}`));
  listCommand.push(command.data.toJSON());
});

const rest = new REST({
  version: 10,
}).setToken(config.token);

const globalCommand = async () => {
  try {
    await rest.put(Routes.applicationCommands(config.clientId), {
      body: listCommand,
    });
    console.log("✅ Command Registered");
  } catch (error) {
    console.error(error);
  }
};

const baseGuildCommand = async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.BaseGuildId),
      {
        body: listCommand,
      }
    );
    console.log("✅ Command For Base Guild Registered");
  } catch (error) {
    console.error(error);
  }
};

const registerCommand = async (type = "global") => {
  try {
    console.log(listCommand, type);
    if (type == "global") {
      await rest
        .put(Routes.applicationCommands(config.clientId), {
          body: [],
        })
        .then(() => {
          console.log("Successfully deleted all application commands.");
          globalCommand();
        })
        .catch(console.error);
    } else if (type == "guild") {
      await rest
        .put(
          Routes.applicationGuildCommands(config.clientId, config.BaseGuildId),
          {
            body: [],
          }
        )
        .then(() => {
          console.log("Successfully deleted all application commands.");
          baseGuildCommand();
        })
        .catch(console.error);
    } else {
      throw new Error("NO REGISTER COMMAND FOUND");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fileCommand,
  registerCommand,
};
