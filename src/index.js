require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

//events
const { clientReadyHandler } = require("./events/clientReady");
const { interactionCreateHandler } = require("./events/interactionCreate");
// commands
const pingCommand = require("./commands/ping");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);

client.once(Events.ClientReady, clientReadyHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);

client.login();
