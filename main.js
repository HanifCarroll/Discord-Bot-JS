const Discord = require('discord.js');
const DISCORD_TOKEN = require('./config').DISCORD_TOKEN;
const responses = require('./responses');
const dictionary = require('./dictionary');
const mediaLogger = require ('./media-logger');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Client is ready.  Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.author.bot) {
    return;
  }

  const content = message.content.toLowerCase();

  responses.sendHeheTymen(message, content);
  responses.sendLinuxRant(message, content);
  await dictionary.sendDefinition(message, content);
  // await mediaLogger.sendMediaData(message);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  await mediaLogger.sendMediaData(newMessage);
});

client.login(DISCORD_TOKEN);
