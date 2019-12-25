const Dictionary = require('oxford-dictionary');
const dictionaryConfig = require('./config').DICTIONARY_CONFIG;

const BASE_URL = 'https://od-api.oxforddictionaries.com/api/v2/entries/en-us/';
const dict = new Dictionary(dictionaryConfig);

async function getDefinition(word) {
  let response = '';

  try {
    response = await dict.definitions(word)
  } catch (err) {
    response = null;
  }

  if (!response) {
    return null;
  }

  let result = ''

  for (let res of response.results) {
    for (let lexicalEntry of res.lexicalEntries) {
      for (let entry of lexicalEntry.entries) {
        for (let sense of entry.senses) {
          for (let definition of sense.definitions) {
            if (definition[definition.length - 1] !== '.') {
              definition += '.';
            }
            result += definition.charAt(0).toUpperCase() + definition.slice(1) + '\n';
          }
        }
      }
    }
  }

  return result
}

module.exports.sendDefinition = async (message, content) => {
  if (!content.includes('define')) {
    return;
  }

  const split = content.split(' ');

  if (split[0] !== 'define' || !split[1]) {
    return;
  }

  const word = split[1];
  const definition = await getDefinition(word);

  definition ? message.channel.send(definition) : message.channel.send('No results found.');
}
