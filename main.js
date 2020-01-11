const Discord = require('discord.js');
const { DISCORD_TOKEN } = require('./config');
const responses = require('./responses');
const dictionary = require('./dictionary');
const mediaLogger = require ('./media-logger');
const misc = require('./misc');

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
  await mediaLogger.sendMediaData(message);
  await mediaLogger.sendYoutubeLength(message);
  await misc.searchGoogle(message, content);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  await mediaLogger.sendMediaData(newMessage);
  await mediaLogger.sendYoutubeLength(newMessage);
});

client.login(DISCORD_TOKEN);
