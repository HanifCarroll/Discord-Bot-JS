const axios = require('axios');
const config = require('./config');
const backendUrl = config.BACKEND_URL;
const youtubeAPI = config.YOUTUBE_API;
const moment = require('moment');
require('moment-duration-format');

const services = ['youtube', 'soundcloud', 'spotify'];

async function collectMediaData(message) {
  const embed = message.embeds[0];

  if (!embed
    || !embed.provider
    || !services.includes(embed.provider.name.toLowerCase())
    ) {
    return;
  }

  const mediaObject = {
    title: embed.title,
    authorName: embed.author && embed.author.name || '',
    authorUrl: embed.author && embed.author.url || '',
    description: embed.description,
    url: embed.url,
    thumbnailUrl: embed.thumbnail.url,
    timePosted: message.createdAt,
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
      .catch(err => console.log('err', err.message));
}

async function sendYoutubeLength(message) {
  const embed = message.embeds[0];

  if (!embed || !embed.provider || !embed.provider.name.toLowerCase() === 'youtube') {
    return;
  }

  const videoKey = getYoutubeId(embed.url);
  axios.get(youtubeAPI + videoKey)
    .then(async data => {
      if (!data.data.items[0]) { return; }

      const duration = data.data.items[0].contentDetails.duration;
      const formattedDuration = moment
        .duration(duration)
        .format('h:mm:ss')
        .padStart(4, '0:0');

      await message.channel.send(`Duration - ${formattedDuration}`)
    })
    .catch(err => console.error(err));
}

// From StackOverflow.  Don't ask.
function getYoutubeId(url){
  url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);

  return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
}

module.exports.sendMediaData = sendMediaData;
module.exports.sendYoutubeLength = sendYoutubeLength;
