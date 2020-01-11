const axios = require('axios');
const { GOOGLE_API_KEY } = require('./config');

async function searchGoogle(message, content) {
  const split = content.split(' ');

  if (split[0] !== 'search') {
    return;
  }

  const searchValue = split.slice(1).join('+');
  const url = `https://kgsearch.googleapis.com/v1/entities:search?query=${searchValue}&key=${GOOGLE_API_KEY}&limit=1&indent=True`;

  try {
    const { data } = await axios.get(url)
    const result = data.itemListElement[0] && data.itemListElement[0].result;

    if (!result) {
      return await message.channel.send('No results found.');
    }

    let results = '';
    results += `${result.name}\n`;
    results += `${result.description}\n`;
    results += `${result.detailedDescription.articleBody}\n`;
    results += `${result.detailedDescription.url}`;

    await message.channel.send(results);
  } catch (err) {
    console.warn(err.message);
  }


}

module.exports.searchGoogle = searchGoogle;