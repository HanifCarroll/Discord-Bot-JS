const axios = require('axios');

async function searchDuckDuckGo(message, content) {
  const split = content.split(' ');

  if (split[0] !== 'search') {
    return;
  }

  const searchValue = split.slice(1).join('+');
  const url = `https://api.duckduckgo.com/?q=${searchValue}&format=json&t=mydiscordbot`;

  try {
    const { data } = await axios.get(url)
    const type = data.Type.toLowerCase();
    let results = '';

    if (type === '') {
      return await message.channel.send('No results found.');
    }

    if (type === 'd') {
      results += `${data.Heading} - Disambiguation\n`;
    }
     
    if (type === 'a') {
      results += `${data.Heading}\n`;
      results += `${data.AbstractText}\n`
    }

    results += data.AbstractURL;
  
    await message.channel.send(results);

  } catch (err) {
    console.warn(err.message);
  }


}

module.exports.searchDuckDuckGo = searchDuckDuckGo;