const axios = require('axios');
const backendUrl = require('./config').BACKEND_URL;

const services = ['youtube', 'soundcloud', 'spotify'];

function collectMediaData(message) {
  const embed = message.embeds[0];

  if (!embed || !services.includes(embed.provider.name.toLowerCase())) {
    return;
  }

  const mediaObject = {
    title: embed.title,
    authorName: embed.author && embed.author.name || '',
    authorUrl: embed.author && embed.author.url || '',
    description: embed.description,
    url: embed.url,
    thumbnailUrl: embed.thumbnail.url,
    timePosted: message.createdTimestamp,
    postedBy: message.author.id,
    service: embed.provider.name,
  };

  return mediaObject;
}

async function sendMediaData(message) {
  const mediaObject = collectMediaData(message);

  if (!mediaObject) {
    return;
  }

  axios.post(backendUrl, mediaObject)
      .then(res => console.log('res', res.data))
      .catch(err => console.log('err', err));
}

module.exports.sendMediaData = sendMediaData;
