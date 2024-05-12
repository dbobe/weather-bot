const { SlashCommandBuilder } = require("discord.js");

const data = SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

async function execute(interaction) {
  await interaction.reply("Pong!");
}

module.exports = {
  data,
  execute,
};
